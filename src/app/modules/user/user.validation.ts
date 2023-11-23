import { z } from 'zod';

export const userFullNameValidationSchema = z
  .object({
    firstName: z.string().min(1).max(20),
    lastName: z.string().min(1).max(20),
  })
  .required();

export const userAddressValidationSchema = z
  .object({
    street: z.string(),
    city: z.string(),
    country: z.string(),
  })
  .required();

export const userOrderValidationSchema = z
  .object({
    productName: z.string(),
    price: z.number(),
    quantity: z.number(),
  })
  .required();

export const userValidationSchema = z
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
  .partial({ orders: true });

export default userValidationSchema;
