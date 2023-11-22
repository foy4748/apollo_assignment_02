import {Schema, model} from "mongoose"
import {TUserFullName, TUserAddress, TUserOrder, IUser} from "./user.interface"


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
	}

})

// UserAddress Schema
const userAddressSchema = new Schema<TUserAddress>({
	street: {type: String, required: true},
	city: {type: String, required: true},
	country: {type: String, required: true}

})

// UserFullName Schema
const userOrderSchema = new Schema<TUserOrder>({
	productName: {type: String, required: true},
	price: {type: Number, required: true},
	quantity: {type: Number, required: true}

})

// User Schema
const userSchema = new Schema<IUser>({
	userId: {
		type: String,
		unique: true,
		required: [true, "userId is required"]
	},
	username: {
		type: String,
		unique: true,
		required: [true, "username is required"]
	},
	password: {
		type: String,
		required: [true, "password is required"],
		maxlength: [20, "password can not be more than 20 characters"],
	},
	fullName: {
		type: userFullNameSchema,
		required: [true, "fullName is required"]
	},

	age: {
		type: Number,
		required: [true, "age is required"]
	},
	email: {
		type: String,
		required: [true, "email is required"]
	},
	isActive: {type: Boolean, required: true},
	hobbies: {
		type: [String],
		required: true
	},
	address: {
		type: userAddressSchema,
		required: true
	},

	orders: {
		type: [userOrderSchema],
		required: true
	},

})

const User = model<IUser>('User', userSchema);
export default User;

