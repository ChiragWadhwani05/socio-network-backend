import { Schema, model} from "mongoose";

const userSchema = new Schema(
	{
		avatar: {
			type: String,
		},
		username: {
			type: String,
			required: true,
			unique: true,
			lowercase: true,
			trim: true,
			index: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
			lowercase: true,
			trim: true,
		},
		password: {
			type: String,
			required: true,
		},
		refreshToken: {
			type: String,
		},
	},
	{
		timestamps: true,
	}
);

const User = model("User", userSchema);

export { User };
