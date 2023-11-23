import express from 'express';
import {
  getAllUsers,
  getSingleUser,
  postSingleUser,
  deleteSingleUser,
} from './user.controller';
const userRoutes = express.Router();

userRoutes.get('/', getAllUsers);
userRoutes.get('/:userId', getSingleUser);
userRoutes.post('/', postSingleUser);
userRoutes.delete('/:userId', deleteSingleUser);

export default userRoutes;
