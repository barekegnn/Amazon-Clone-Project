import { ApiError, isApiError } from '../utils/apiError.js';

export const notFoundHandler = (req, res, next) => {
  next(new ApiError(404, `Route ${req.originalUrl} not found`));
};

export const errorHandler = (err, req, res, next) => { // eslint-disable-line no-unused-vars
  const isKnownError = isApiError(err);
  const statusCode = isKnownError ? err.statusCode : 500;
  const responseBody = {
    success: false,
    message: isKnownError ? err.message : 'Internal server error'
  };

  if (isKnownError && err.errors) {
    responseBody.errors = err.errors;
  }

  if (!isKnownError) {
    console.error(err);
  }

  if (process.env.NODE_ENV !== 'production' && err.stack) {
    responseBody.stack = err.stack;
  }

  res.status(statusCode).json(responseBody);
};
