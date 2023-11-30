const { response } = require("express");
const { ObjectId } = require("mongoose").Types;

const { User } = require("../models");

const allowedCollections = ["users", "category", "products", "roles"];

const searchUsers = async (phrase = "", res = response) => {
	const isMongoID = ObjectId.isValid(phrase); //True

	if (!isMongoID) {
		res.status(400).json({
			msg: "Mongo id not valid",
			results: [],
		});
	} else {
		const user = await User.findById(phrase);

		res.json({
			results: user ? [user] : [],
		});
	}
};

const search = (req, res = response) => {
	const { collection, phrase } = req.params;

	if (!allowedCollections.includes(collection)) {
		return res.status(400).json({
			msg: `The allowed collections are: ${allowedCollections}`,
		});
	}

	switch (collection) {
		case "users":
			searchUsers(phrase, res);
			break;

		case "category":
			break;

		case "products":
			break;

		case "users":
			break;

		case "roles":
			break;

		default:
			res.status(500).json({
				msg: `There is no search...`,
			});
			break;
	}

	// res.json({
	// 	collection,
	// 	phrase,
	// });
};

module.exports = {
	search,
};
