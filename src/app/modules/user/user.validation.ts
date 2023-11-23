import { z } from 'zod';

const userFullNameValidationSchema = z
  .object({
    firstName: z.string().min(1).max(20),
    lastName: z.string().min(1).max(20),
  })
  .required();

const userAddressValidationSchema = z
  .object({
    street: z.string(),
    city: z.string(),
    country: z.string(),
  })
  .required();

const userOrderValidationSchema = z
  .object({
    productName: z.string(),
    price: z.number(),
    quantity: z.number(),
  })
  .required();

const userValidationSchema = z
  .object({
    userId: z.number(),
    username: z.string(),
    password: z.string(),
    fullName: userFullNameValidationSchema,

    age: z.number(),
    email: z.string().email(),
    isActive: z.boolean(),
    hobbies: z.array(z.string()),
    address: userAddressValidationSchema,

    orders: z.array(userOrderValidationSchema),
  })
  .required();

export default userValidationSchema;
