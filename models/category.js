const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, "The name is required"],
	},
	state: {
		type: Boolean,
		default: true,
		required: true,
	},
	user: {
		type: mongoose.Schema.ObjectId,
		ref: "User",
		required: true,
	},
});

const Category = mongoose.model("User", categorySchema);

module.exports = Category;
