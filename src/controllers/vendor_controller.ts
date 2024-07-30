import { Request, Response } from 'express';
import mongoose from 'mongoose';

import Logger from '../libs/logger.js';
import Vendor from '../models/VendorModel/VendorModel.js';


export const createVendor = async (req: Request, res: Response) => {
  try {
    const { name, address, phoneNumber } = req.body;
    const newVendor = new Vendor({
      name,
      address,
      phoneNumber,
      createdBy: req.staff._id, 
      _id: new mongoose.Types.ObjectId()
    });
    await newVendor.save();
    res.status(201).send(newVendor);
  } catch (error) {
    res.status(400).send('Error creating vendor');
  }
};

// Get all vendors
export const getVendors = async (req: Request, res: Response) => {
  try {
    const vendors = await Vendor.find();
    return res.status(200).json({
      status: 'success',
      data: vendors
    });
  } catch(error) {
    Logger.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// Get vendor by ID
export const getVendorById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: 'Invalid Vendor ID format' });
    }
    const vendor = await Vendor.findById(id);
    if (!vendor) {
      return res.status(404).json({
        status: 'failed',
        message: `Vendor not found with id ${id}`
      });
    }

    return res.status(200).json({
      status: 'success',
      data: vendor
    });
  } catch (error) {
    Logger.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// Update vendor
export const updateVendor = async (req: Request, res: Response) => {
  const { name, address, phoneNumber } = req.body;
  const { id } = req.params;
  try {
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: 'Invalid Vendor ID format' });
    }
    const vendor = await Vendor.findByIdAndUpdate(
      id,
      { name, address, phoneNumber },
      { new: true, runValidators: true }
    );
    if (!vendor) {
      return res.status(404).json({
        status: 'failed',
        message: `Vendor not found with id ${id}`
      });
    }

    return res.status(200).json({
      status: 'success',
      data: vendor
    });
  } catch (error) {
    Logger.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
