import { Request, Response } from 'express';
import { Document } from 'mongoose';

import { createMeterApiValidator, updateMeterApiValidator } from '../api_validators/meter-api-validators.js';
import { advancedResults } from '../helpers/query.js';
import Logger from '../libs/logger.js';
import Meter, { MeterDocumentResult } from '../models/MeterModel/MeterModel.js';
import { MeterDoc, RegisterMeterRequestBody } from '../types/meter.js';
// import { generateMeterHistory } from './../helpers/meter_helper.js';

export const createMeter = async (req: Request, res: Response) => {
  const body = req.body as RegisterMeterRequestBody;
  const { meterNumber, typeOfMeter, vendor, meterStatus, barcode } = body;
  try {
    const { error } = createMeterApiValidator.validate(req.body);
    if (error) {
      return res.status(422).json({ error: error.details[0].message });
    }
    const createdBy = req.staff._id;
    // TODO: implement meter history here
    //const history = generateMeterHistory(meterStatus, customer)

    const newDept = new Meter({ meterNumber, typeOfMeter, vendor, createdBy, meterStatus, barcode });
    await newDept.save();
    return res.status(201).json({
      status: 'success',
      message: 'Meter created successfully',
      data: newDept
    });
  } catch (error) {
    Logger.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const updateMeter = async (req: Request, res: Response) => {
  const body = req.body as RegisterMeterRequestBody;
  const { meterStatus } = body;
  // TODO: implement meter history here
  //const history = generateMeterHistory(meterStatus, customer)
  // Ensure WHEN a meter is validated the address must match current address

  const { id } = req.params;
  try {
    const { error } = updateMeterApiValidator.validate(req.body);
    if (error) {
      return res.status(422).json({ error: error.details[0].message });
    }
    const meter = await Meter.findOne({ _id: id });
    if (!meter) {
      return res.status(404).json({ message: 'meter not found' });
    }
    if (id) {
      await Meter.findByIdAndUpdate({ _id: id }, { meterStatus });
      return res.status(200).json({
        status: 'success'
      });
    } else {
      return res.status(422).json({ error: 'id is required' });
    }
  } catch (error) {
    Logger.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const getMeter = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const meter = await Meter.findOne<MeterDocumentResult>({ _id: id });
    if (!meter) {
      return res.status(404).json({
        status: 'failed',
        message: `Meter not found with id ${id}`
      });
    }
    return res.status(200).json({
      status: 'success',
      data: meter
    });
  } catch (error) {
    Logger.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const getMeters = async (req: Request, res: Response) => {
  try {
    const staffs = await advancedResults<MeterDoc, MeterDocumentResult & Document>(req.url, Meter);
    return res.status(200).json({
      status: 'success',
      data: staffs
    });
  } catch (error) {
    Logger.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const getByBarcode = async (req: Request, res: Response) => {
  const { barcode } = req.params;
  try {
    const meter = await Meter.findOne<MeterDocumentResult>({ barcode: barcode });
    if (!meter) {
      return res.status(404).json({
        status: 'failed',
        message: `Meter not found with barcode ${barcode}`
      });
    }
    return res.status(200).json({
      status: 'success',
      data: meter
    });
  } catch (error) {
    Logger.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const getMeterByVendor = async (req: Request, res: Response) => {
  try {
    const result = await Meter.aggregate([
      {
        $group: {
          _id: '$vendor', // Group by vendor ObjectId
          count: { $sum: 1 } // Count the number of meters for each vendor
        }
      },
      {
        $lookup: {
          from: 'vendors', // Name of the collection where vendor details are stored
          localField: '_id', // Field to join on (vendor ObjectId)
          foreignField: '_id', // Field in the vendors collection to match (vendor ObjectId)
          as: 'vendorDetails' // Name of the field to output
        }
      },
      {
        $unwind: '$vendorDetails' // Flatten the vendorDetails array
      },
      {
        $project: {
          _id: 0, // Exclude the _id field
          vendorID: '$_id', // Include vendorID
          vendorName: '$vendorDetails.name', // Include vendorName
          count: 1 // Include the count of meters
        }
      }
    ]);

    return res.status(200).json({
      status: 'success',
      data: result
    });
  } catch (error) {
    Logger.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
