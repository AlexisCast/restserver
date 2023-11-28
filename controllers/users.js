const { response } = require("express");
const bycryptjs = require("bcryptjs");

const User = require("../models/user");

const usersGet = async (req, res = response) => {
	const { limit = 5, from = 0 } = req.query;
	///api/users?limit=5&from=10
	const query = { state: true };

	const users = await User.find(query)
		.skip(Number(from))
		.limit(Number(limit));

	const total = await User.countDocuments(query);x

	res.json({
		total,
		users,
	});
};

const userPost = async (req, res = response) => {
	const { name, email, password, role } = req.body;
	const user = new User({ name, email, password, role });

	//Encrypt the password
	const salt = bycryptjs.genSaltSync(10);
	user.password = bycryptjs.hashSync(password, salt);

	//Save in DB

	try {
		await user.save();
		res.status(201).send({ user });
	} catch (e) {
		res.status(400).send(e);
	}
};

const usersPut = async (req, res = response) => {
	const { id } = req.params;
	const { _id, password, google, email, ...rest } = req.body;

	//TODO validate with DB
	if (password) {
		//Encrypt the password
		const salt = bycryptjs.genSaltSync(10);
		rest.password = bycryptjs.hashSync(password, salt);
	}

	const userUpdated = await User.findByIdAndUpdate(id, rest, { new: true });
	// res.status(200).send({
	// 	userUpdated,
	// });
	res.json({
		userUpdated,
	});
};

const usersPatch = (req, res = response) => {
	res.json({
		msg: "patch API - usersPatch",
	});
};

const usersDelete = (req, res = response) => {
	res.json({
		msg: "delete API - usersDelete",
	});
};

module.exports = {
	usersGet,
	userPost,
	usersPut,
	usersPatch,
	usersDelete,
};
