import express from 'express';
import {
  getAllUsers,
  getSingleUser,
  postSingleUser,
  deleteSingleUser,
  errorHandler,
  putSingleUser,
} from './user.controller';
const userRoutes = express.Router();

userRoutes.get('/', getAllUsers);
userRoutes.get('/:userId', getSingleUser);
userRoutes.put('/:userId', putSingleUser);
userRoutes.post('/', postSingleUser);
userRoutes.delete('/:userId', deleteSingleUser);

// Using Error Handling Middleware
userRoutes.use(errorHandler);

export default userRoutes;
