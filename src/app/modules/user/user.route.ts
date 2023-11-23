import express from 'express';
import { getAllUsers, postSingleUser } from './user.controller';
const userRoutes = express.Router();

userRoutes.get('/', getAllUsers);
userRoutes.post('/', postSingleUser);

export default userRoutes;
