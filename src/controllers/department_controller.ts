import { Request, Response } from 'express';
import { Document } from 'mongoose';

import { createDeptApiValidator } from '../api_validators/department-api-validators.js';
import { advancedResults } from '../helpers/query.js';
import Logger from '../libs/logger.js';
import Department, { DepartmentDocumentResult } from '../models/DepartmentModel/DepartmentModel.js';
import { DepartmentDoc, RegisterDeptRequestBody } from '../types/department/department.js';

export const createDepartment = async (req: Request, res: Response) => {
  const body = req.body as RegisterDeptRequestBody;
  const { name, acronym } = body;
  try {
    const { error } = createDeptApiValidator.validate(req.body);
    if (error) {
      return res.status(422).json({ error: error.details[0].message });
    }
    const newDept = new Department({ name, acronym });
    await newDept.save();
    return res.status(201).json({
      status: 'success',
      message: 'Department created successfully',
      data: newDept
    });
  } catch (error) {
    Logger.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const getDepartments = async (req: Request, res: Response) => {
  try {
    const departments = await advancedResults<DepartmentDoc, DepartmentDocumentResult & Document>(req.url, Department);
    return res.status(200).json({
      status: 'success',
      data: departments
    });
  } catch (error) {
    Logger.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const getDepartment = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const department = await Department.findOne<DepartmentDocumentResult>({ _id: id });
    if (!department) {
      return res.status(404).json({
        status: 'failed',
        message: `Department not found with id ${id}`
      });
    }

    return res.status(200).json({
      status: 'success',
      data: department
    });
  } catch (error) {
    Logger.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const updateDepartment = async (req: Request, res: Response) => {
  const body = req.body as RegisterDeptRequestBody;
  const { name, acronym } = body;
  const { id } = req.params;
  try {
    const { error } = createDeptApiValidator.validate(req.body);
    if (error) {
      return res.status(422).json({ error: error.details[0].message });
    }
    if (id) {
      await Department.findByIdAndUpdate({ _id: id }, { name, acronym });
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

export const deleteDepartment = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    if (id) {
      await Department.findByIdAndUpdate({ _id: id }, { isActive: false });
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
