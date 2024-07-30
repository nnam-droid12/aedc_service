import { Model } from 'mongoose';

type PaginationParams = {
  page?: string;
  limit?: string;
  sort?: string;
};

export const paginate = async <T>(data: PaginationParams, model: Model<T>) => {
  const page = parseInt(data.page, 10) || 1;
  const limit = parseInt(data.limit, 10) || 100;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = await model.countDocuments({});
  const sort = data.sort;

  const results = await model
    .find({})
    .sort(sort === 'desc' ? { createdAt: -1 } : { createdAt: 1 })
    .limit(limit)
    .skip(startIndex);

  const pagination: { prev?: { page: number }; next?: { page: number } } = {};
  if (endIndex < total) {
    pagination.next = {
      page: page + 1
    };
  }

  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1
    };
  }

  return {
    data: results,
    count: results.length,
    page: page,
    limit: limit,
    prevPage: pagination.prev?.page || null,
    nextPage: pagination.next?.page || null
  };
};