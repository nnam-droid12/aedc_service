import { Types } from 'mongoose';

import { AdvancedQueryResult } from '../queryresults.js';

export type DepartmentDoc = {
  _id: Types.ObjectId;
  id: string;
  name: string;
  acronym: string;
  staff: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
};

export type AdvancedStaffsQueryResult = AdvancedQueryResult<DepartmentDoc>;

export type RegisterDeptRequestBody = Omit<DepartmentDoc, '_id' | 'createdAt' | 'updatedAt'>;
