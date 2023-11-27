const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
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
	image: {
		type: String,
	},
	role: {
		type: String,
		required: true,
		enum: ["ADMIN_ROLE", "USER_ROLE"],
	},
	state: {
		type: Boolean,
		default: true,
	},
	google: {
		type: Boolean,
		default: false,
	},
});

const User = mongoose.model("User", userSchema);

module.exports = User;
