import { NextFunction, Request, Response } from 'express';
import { IUser } from './user.interface';
import {
  SgetAllUsers,
  SpostSingleUser,
  SgetSingleUser,
  SdeleteSingleUser,
  SputSingleUser,
  SgetAllUserOrders,
  SgetAllUserOrdersSum,
  SputSingleUserSingleOrder,
} from './user.service';

import userValidationSchema, {
  userOrderValidationSchema,
} from './user.validation';

type TerrorObj = {
  success: false;
  message: string;
  error: {
    code: number;
    description: string;
  };
};

type TresObj = {
  success: true;
  message: string;
  data: object | object[] | null;
};

const UserDoesnotExist = (slug: string): TerrorObj => {
  const errorObj: TerrorObj = {
    success: false,
    message: `User with slug ${slug} doesn't exist`,
    error: {
      code: 404,
      description: `User with slug ${slug} doesn't exist`,
    },
  };

  return errorObj;
};

export const errorHandler = async (
  error: Partial<TerrorObj>,
  _: Request,
  res: Response,
  __: NextFunction,
) => {
  return res.send(error);
};

export const getAllUsers = async (
  _: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const users: IUser[] = await SgetAllUsers();
    res.json(users);
  } catch (error: unknown) {
    const errorObj: TerrorObj = {
      success: false,
      message: 'FAILED to GET All Users.',
      error: {
        code: 501,
        description: 'FAILED to GET All Users.',
      },
    };
    next(errorObj);
  }
};

export const postSingleUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const zodValidatedData = userValidationSchema.parse(req.body);
    const response = await SpostSingleUser(zodValidatedData);
    const {
      userId,
      username,
      fullName,
      age,
      email,
      isActive,
      hobbies,
      address,
    } = response;
    address._id = undefined;
    fullName._id = undefined;
    const resObj: TresObj = {
      success: true,
      message: 'User created successfully!',
      data: {
        userId,
        username,
        fullName,
        age,
        email,
        isActive,
        hobbies,
        address,
      },
    };
    res.send(resObj);
    // eslint-disable-next-line
  } catch (error: any) {
    const errorObj: TerrorObj = {
      success: false,
      message: error?.message ?? 'FAILED to POST Single User Data.',
      error: {
        code: 501,
        description: 'FAILED to POST Single User Data.',
      },
    };
    next(errorObj);
  }
};

export const getSingleUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { userId } = req.params;
    const user: IUser | boolean | null = await SgetSingleUser(userId);
    if (user) {
      const resObj: TresObj = {
        success: true,
        message: 'User fetched successfully!',
        data: user,
      };
      return res.json(resObj);
    } else {
      return res.json(UserDoesnotExist(userId));
    }
  } catch (error: unknown) {
    const errorObj: TerrorObj = {
      success: false,
      message: 'FAILED to GET Single User Data.',
      error: {
        code: 501,
        description: 'FAILED to GET Single User Data.',
      },
    };
    next(errorObj);
  }
};

export const deleteSingleUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { userId } = req.params;
    const response = await SdeleteSingleUser(userId);
    if (response) {
      const resObj: TresObj = {
        success: true,
        message: 'User deleted successfully!',
        data: null,
      };
      return res.json(resObj);
    } else {
      next(UserDoesnotExist(userId));
    }
  } catch (error: unknown) {
    const errorObj: TerrorObj = {
      success: false,
      message: 'FAILED to DELETE Single User',
      error: {
        code: 501,
        description: 'FAILED to DELETE Single User Data.',
      },
    };
    next(errorObj);
  }
};

export const putSingleUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { userId } = req.params;
    const zodValidatedData = userValidationSchema.parse(req.body);
    const response = await SputSingleUser(userId, zodValidatedData);
    if (response) {
      const resObj: TresObj = {
        success: true,
        message: 'User updated successfully!',
        data: response,
      };
      return res.json(resObj);
    } else {
      next(UserDoesnotExist(userId));
    }
  } catch (error: unknown) {
    const errorObj: TerrorObj = {
      success: false,
      message: 'FAILED to UPDATE Single User',
      error: {
        code: 501,
        description: 'FAILED to UPDATE Single User Data.',
      },
    };
    next(errorObj);
  }
};

// Bonus Part ==========================================
// =========== Bonus Part 2
export const getAllUserOrders = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { userId } = req.params;
    const orders = await SgetAllUserOrders(userId);
    if (orders) {
      const resObj: TresObj = {
        success: true,
        message: 'Order fetched successfully!',
        data: orders,
      };
      return res.json(resObj);
    } else {
      next(UserDoesnotExist(userId));
    }
  } catch (error) {
    const errorObj: TerrorObj = {
      success: false,
      message: 'FAILED to GET User Orders',
      error: {
        code: 501,
        description: 'FAILED to GET User Orders',
      },
    };
    next(errorObj);
  }
};

// =========== Bonus Part 3
export const getAllUserOrdersSum = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { userId } = req.params;
    const sum = await SgetAllUserOrdersSum(userId);
    if (typeof sum == 'boolean' && !sum) {
      res.send({ error: true });
    } else if (Object.keys(sum).length == 0) {
      const resObj: TresObj = {
        success: true,
        message: 'Total price calculated successfully!',
        data: {
          totalPrice: 0.0,
        },
      };
      res.send(resObj);
    } else {
      const resObj: TresObj = {
        success: true,
        message: 'Total price calculated successfully!',
        data: sum,
      };
      res.send(resObj);
    }
  } catch (error) {
    const errorObj: TerrorObj = {
      success: false,
      message: 'FAILED to CALCULATE User Order Prices',
      error: {
        code: 501,
        description: 'FAILED to CALCULATE User Order Prices',
      },
    };
    next(errorObj);
  }
};

// =========== Bonus Part 1
export const putSingleUserSingleOrder = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { userId } = req.params;
    const zodValidatedData = userOrderValidationSchema.parse(req.body);
    await SputSingleUserSingleOrder(userId, zodValidatedData);
    const resObj: TresObj = {
      success: true,
      message: 'Order created successfully!',
      data: null,
    };
    res.send(resObj);
  } catch (error) {
    const errorObj: TerrorObj = {
      success: false,
      message: "FAILED to Add User's New Order",
      error: {
        code: 501,
        description: "FAILED to Add User's New Order",
      },
    };
    next(errorObj);
  }
};
