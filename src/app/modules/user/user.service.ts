import { IUser } from './user.interface';
import UserModel from './user.model';

const SgetAllUsers = async () => {
  const allUsers: IUser[] = await UserModel.find({});
  return allUsers;
};

const SpostSingleUser = async (validatedData: IUser) => {
  const response = await UserModel.create(validatedData);
  return response;
};

const SgetSingleUser = async (slug: string) => {
  const singleUser: IUser = (await UserModel.findOne({
    userId: slug,
  })) as IUser;
  return singleUser;
};

const SdeleteSingleUser = async (slug: string) => {
  const deleteResponse = await UserModel.deleteOne({ userId: slug });
  return deleteResponse;
};

export { SgetAllUsers, SpostSingleUser, SgetSingleUser, SdeleteSingleUser };
