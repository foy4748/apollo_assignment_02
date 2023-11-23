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

const errorHandler = async (
  error: Partial<TerrorObj>,
  _: Request,
  res: Response,
  __: NextFunction,
) => {
  return res.send(error);
};

const getAllUsers = async (_: Request, res: Response, next: NextFunction) => {
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

const postSingleUser = async (
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
  } catch (error: unknown) {
    console.log(error);
    const errorObj: TerrorObj = {
      success: false,
      message: 'FAILED to POST Single User Data.',
      error: {
        code: 501,
        description: 'FAILED to POST Single User Data.',
      },
    };
    next(errorObj);
  }
};

const getSingleUser = async (
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
      const errorObj: TerrorObj = {
        success: false,
        message: `NO user found using provided slug: ${userId}`,
        error: {
          code: 404,
          description: `NO user found using provided slug: ${userId}`,
        },
      };
      return res.json(errorObj);
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

const deleteSingleUser = async (
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
      const errorObj: TerrorObj = {
        success: false,
        message: `User with slug ${userId} doesn't exists`,
        error: {
          code: 404,
          description: `User with slug ${userId} doesn't exists`,
        },
      };
      next(errorObj);
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

const putSingleUser = async (
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
      const errorObj: TerrorObj = {
        success: false,
        message: `User with slug ${userId} doesn't exists`,
        error: {
          code: 404,
          description: `User with slug ${userId} doesn't exists`,
        },
      };
      next(errorObj);
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
const getAllUserOrders = async (
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
      const errorObj: TerrorObj = {
        success: false,
        message: `User with slug ${userId} doesn't exists`,
        error: {
          code: 404,
          description: `User with slug ${userId} doesn't exists`,
        },
      };
      next(errorObj);
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
const getAllUserOrdersSum = async (
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
const putSingleUserSingleOrder = async (
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

export {
  getAllUsers,
  getAllUserOrders,
  getAllUserOrdersSum,
  postSingleUser,
  putSingleUser,
  putSingleUserSingleOrder,
  getSingleUser,
  deleteSingleUser,
  errorHandler,
};
