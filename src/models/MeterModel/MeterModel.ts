import mongoose, { Model, Schema } from 'mongoose';

import { METER_TYPE, MeterDoc } from '../../types/meter.js';
import {
  BaseModelMethods,
  findActive,
  findAllActiveAndPopulate,
  findAndPopulate,
  findOneActive
} from '../methods/methods.js';

type BaseDocument<T> = {
  _doc: T;
};

export type MeterDocumentResult = MeterDoc & BaseDocument<MeterDoc>;

type MeterModel = BaseModelMethods<MeterDocumentResult> & Model<MeterDoc>;

const meterSchema = new mongoose.Schema<MeterDocumentResult, MeterModel>(
  {
    meterNumber: {
      type: String,
      required: true,
      unique: true
    },
    barcode: {
      type: String,
      required: true,
      unique: true
    },
    typeOfMeter: {
      type: String,
      enum: METER_TYPE,
      required: [true, 'Please Add Meter type']
    },
    meterHistory: [
      {
        type: String
      }
    ],
    customer: {
      type: Schema.Types.ObjectId,
      ref: 'Customer'
    },
    vendor: {
      type: Schema.Types.ObjectId,
      ref: 'Vendor',
      required: [true, 'Please Add Vendor']
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'Staff'
    },
    updatedBy: {
      type: Schema.Types.ObjectId,
      ref: 'Staff'
    }
  },
  {
    timestamps: true
  }
);

meterSchema.static('findOneActive', findOneActive);
meterSchema.static('findActive', findActive);
meterSchema.static('findAndPopulate', findAndPopulate);
meterSchema.static('findAllActiveAndPopulate', findAllActiveAndPopulate);

const Meter = mongoose.model<MeterDocumentResult, MeterModel>('Meter', meterSchema);
export default Meter;
