import bcrypt from 'bcrypt';
import config from '../../config/index';
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
  const isUserExists = await UserModel.isIdExists(slug);
  if (isUserExists) {
    const singleUser: IUser | null = await UserModel.findOne(
      {
        userId: Number(slug),
      },
      // Projection
      {
        _id: 0,
        __v: 0,
        password: 0,
        orders: 0,
        'fullName._id': 0,
        'address._id': 0,
      },
    );
    return singleUser;
  } else {
    return false;
  }
};

const SdeleteSingleUser = async (slug: string) => {
  const isIdExists = await UserModel.isIdExists(slug);
  if (isIdExists) {
    const deleteResponse = await UserModel.deleteOne({ userId: slug });
    return deleteResponse;
  } else {
    return false;
  }
};

const SputSingleUser = async (
  slug: string,
  validatedUpdatedDoc: Partial<IUser>,
) => {
  const options = {
    projection: {
      _id: 0,
      __v: 0,
      password: 0,
      orders: 0,
      'fullName._id': 0,
      'address._id': 0,
    },
    new: true,
  };

  const isUserExists = await UserModel.isIdExists(slug);
  if (isUserExists) {
    // Hashing Password on Update!
    validatedUpdatedDoc.password = await bcrypt.hash(
      String(validatedUpdatedDoc.password),
      Number(config?.bcrypt_salt_rounds),
    );

    const response: IUser | null = await UserModel.findOneAndUpdate(
      { userId: Number(slug) },
      validatedUpdatedDoc,
      options,
    );
    return response;
  } else {
    return false;
  }
};

export {
  SgetAllUsers,
  SpostSingleUser,
  SgetSingleUser,
  SdeleteSingleUser,
  SputSingleUser,
};
