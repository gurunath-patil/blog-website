const mongoose = require("mongoose")
const { Schema, model } = mongoose

const userSchema = new Schema(
	{
		username: {
			type: String,
			required: [true, "Email is required"],
		},
		email: {
			type: String,
			required: [true, "Email is required"],
		},
		password: {
			type: String,
			required: [true, "Email is required"],
		},
		blogs: [String],
	},
	{ timestamps: true }
)

const UserModel = model("User", userSchema)

module.exports = UserModel
