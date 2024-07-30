import mongoose, { Model, Schema } from 'mongoose';

import { DepartmentDoc } from '../../types/department/department.js';
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

export type DepartmentDocumentResult = DepartmentDoc & BaseDocument<DepartmentDoc>;

type DepartmentModel = BaseModelMethods<DepartmentDocumentResult> & Model<DepartmentDoc>;

const departmentSchema = new mongoose.Schema<DepartmentDocumentResult, DepartmentModel>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },
    acronym: {
      type: String,
      required: [true, 'Please Add Acronym of Department']
    },
    staff: {
      type: Schema.Types.ObjectId,
      ref: 'Staff'
    },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

departmentSchema.static('findOneActive', findOneActive);
departmentSchema.static('findActive', findActive);
departmentSchema.static('findAndPopulate', findAndPopulate);
departmentSchema.static('findAllActiveAndPopulate', findAllActiveAndPopulate);

const Department = mongoose.model<DepartmentDocumentResult, DepartmentModel>('Department', departmentSchema);
export default Department;
