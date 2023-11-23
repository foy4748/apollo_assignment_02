import { ObjectId } from 'mongoose';

export type TUserFullName = {
  firstName: string;
  lastName: string;
  _id?: ObjectId;
};

export type TUserAddress = {
  street: string;
  city: string;
  country: string;
  _id?: ObjectId;
};

export type TUserOrder = {
  productName: string;
  price: number;
  quantity: number;
  _id?: ObjectId;
};

export interface IUser {
  userId: number;
  username: string;
  password: string;
  fullName: TUserFullName;

  age: number;
  email: string;
  isActive: boolean;
  hobbies: string[];
  address: TUserAddress;

  orders?: TUserOrder[];
  _id?: ObjectId;
}
