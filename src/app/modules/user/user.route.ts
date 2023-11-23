import express from 'express';
import {
  getAllUsers,
  getSingleUser,
  postSingleUser,
  deleteSingleUser,
  errorHandler,
  putSingleUser,
  getAllUserOrders,
  getAllUserOrdersSum,
  putSingleUserSingleOrder,
} from './user.controller';
const userRoutes = express.Router();

// Users Routes
userRoutes.get('/', getAllUsers);
userRoutes.get('/:userId', getSingleUser);
userRoutes.put('/:userId', putSingleUser);
userRoutes.post('/', postSingleUser);
userRoutes.delete('/:userId', deleteSingleUser);

// Bonuse :: Order Routes
userRoutes.get('/:userId/orders', getAllUserOrders);
userRoutes.put('/:userId/orders', putSingleUserSingleOrder);
userRoutes.get('/:userId/orders/total-price', getAllUserOrdersSum);

// Using Error Handling Middleware
userRoutes.use(errorHandler);

export default userRoutes;
