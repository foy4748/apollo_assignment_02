import bcrypt from 'bcrypt';
import config from '../../config/index';
import { IUser, TUserOrder } from './user.interface';
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

const SgetAllUserOrders = async (slug: string) => {
  const isUserExists = await UserModel.isIdExists(slug);
  if (isUserExists) {
    const orders = await UserModel.findOne(
      { userId: slug },
      { orders: 1, _id: 0 },
    );
    return orders;
  } else {
    return false;
  }
};
const SgetAllUserOrdersSum = async (slug: string) => {
  const isUserExists = await UserModel.isIdExists(slug);
  if (isUserExists) {
    const sum = await UserModel.aggregate([
      {
        $match: {
          userId: Number(slug),
        },
      },
      { $unwind: '$orders' },
      {
        $group: {
          _id: null,
          totalPrice: {
            $sum: { $multiply: ['$orders.price', '$orders.quantity'] },
          },
        },
      },
      {
        $project: {
          totalPrice: 1,
          _id: 0,
        },
      },
    ]);
    if (sum.length) {
      return sum[0];
    } else {
      return {};
    }
  } else {
    return false;
  }
};

const SputSingleUserSingleOrder = async (
  slug: string,
  zodValidatedData: TUserOrder,
) => {
  const isUserExists = await UserModel.isIdExists(slug);
  if (isUserExists) {
    const addedData = await UserModel.updateOne(
      { userId: Number(slug) },
      {
        $addToSet: zodValidatedData,
      },
      {
        new: true,
      },
    );
    return addedData;
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
  SputSingleUserSingleOrder,
  SgetAllUserOrders,
  SgetAllUserOrdersSum,
};
