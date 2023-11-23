import bcrypt from 'bcrypt';
import { Schema, model } from 'mongoose';
import {
  TUserFullName,
  TUserAddress,
  TUserOrder,
  IUser,
} from './user.interface';
import config from '../../config/index';

// UserFullName Schema
const userFullNameSchema = new Schema<TUserFullName>({
  firstName: {
    type: String,
    required: true,
    trim: true,
    maxlength: [20, 'Name can not be more than 20 characters'],
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    maxlength: [20, 'Name can not be more than 20 characters'],
  },
});

// UserAddress Schema
const userAddressSchema = new Schema<TUserAddress>({
  street: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
});

// UserFullName Schema
const userOrderSchema = new Schema<TUserOrder>({
  productName: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

// User Schema
const userSchema = new Schema<IUser>({
  userId: {
    type: Number,
    unique: true,
    required: [true, 'userId is required'],
  },
  username: {
    type: String,
    unique: true,
    required: [true, 'username is required'],
  },
  password: {
    type: String,
    required: [true, 'password is required'],
    maxlength: [20, 'password can not be more than 20 characters'],
  },
  fullName: {
    type: userFullNameSchema,
    required: [true, 'fullName is required'],
  },

  age: {
    type: Number,
    required: [true, 'age is required'],
  },
  email: {
    type: String,
    required: [true, 'email is required'],
  },
  isActive: { type: Boolean, required: true },
  hobbies: {
    type: [String],
    required: true,
  },
  address: {
    type: userAddressSchema,
    required: true,
  },

  orders: {
    type: [userOrderSchema],
  },
});

// Defining Mongoose Middlewares

userSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(
    this.password,
    parseInt(config?.bcrypt_salt_rounds ?? '10'),
  );
  next();
});

// userSchema.post('save', function (doc: Partial<IUser>, next) {
//   doc.password = undefined;
//   doc.orders = undefined;
//   next();
// });

userSchema.pre('find', function (next) {
  this.projection({
    _id: 0,
    __v: 0,
    password: 0,
    orders: 0,
    userId: 0,
    isActive: 0,
    hobbies: 0,
    'fullName._id': 0,
    'address._id': 0,
  });
  next();
});

userSchema.pre('findOne', function (next) {
  this.projection({
    _id: 0,
    __v: 0,
    password: 0,
    orders: 0,
    'fullName._id': 0,
    'address._id': 0,
  });
  next();
});

// -----------------------------

const User = model<IUser>('User', userSchema);
export default User;
