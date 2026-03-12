import axios from 'axios';
import { AppError } from './error.ts';
import { STATUS_CODES } from './status-codes.ts';
import { logger } from './logger.ts';

export const getProductDetails = async (productId: number) => {
  try {
    const response = await axios.get(`${''}/api/products/${productId}`);
    return response.data;
  } catch (error) {
    logger.error(error);
    throw new AppError(STATUS_CODES.BAD_REQUEST, 'Product not found');
  }
};
