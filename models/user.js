const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: [true, "The email is required"],
		},
		password: {
			type: String,
			required: [true, "The password is required"],
		},
		resetLink: {
			type: String,
			default: "",
		},
		img: {
			type: String,
		},
		role: {
			type: String,
			required: true,
			// enum: ["ADMIN_ROLE", "USER_ROLE"],
			default: "USER_ROLE",
		},
		state: {
			type: Boolean,
			default: true,
		},
		google: {
			type: Boolean,
			default: false,
		},
	},
	{
		timestamps: true,
	}
);

userSchema.methods.toJSON = function () {
	//remove __v and password
	const { __v, password, resetLink, _id, ...user } = this.toObject();
	user.uid = _id;

	return user;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
