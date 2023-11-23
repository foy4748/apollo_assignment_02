import express from 'express';
import {
  getAllUsers,
  getSingleUser,
  postSingleUser,
  deleteSingleUser,
  errorHandler,
  putSingleUser,
  getAllUserOrders,
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

// Using Error Handling Middleware
userRoutes.use(errorHandler);

export default userRoutes;
