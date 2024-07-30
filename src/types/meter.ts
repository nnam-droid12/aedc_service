import { Types } from 'mongoose';

import { AdvancedQueryResult } from './queryresults.js';

export enum METER_TYPE {
  SINGLE_METER = 'single meter',
  THREE_PHASE_METER = '3 phase meter',
  TWO_PHASE_METER = '2 phase meter',
  FEEDER_METER = 'feeder meter'
}

export type MeterDoc = {
  _id: Types.ObjectId;
  id: string;
  name: string;
  meterNumber: string;
  typeOfMeter: METER_TYPE;
  meterHistory: string[];
  customer: Types.ObjectId;
  vendor: Types.ObjectId;
  createdAt: Date;
  createdBy: Types.ObjectId;
  updatedAt: Date;
  isActive: boolean;
};

export type AdvancedMeterQueryResult = AdvancedQueryResult<MeterDoc>;

export type RegisterMeterRequestBody = Omit<MeterDoc, '_id' | 'createdAt' | 'updatedAt'>;
