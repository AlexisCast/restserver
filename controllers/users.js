const { response } = require("express");
const User = require("../models/user");

const usersGet = (req, res = response) => {
	const { q, name = "no name", apikey } = req.query;
	///api/users?q=hola&apikey=123

	res.json({
		msg: "get API - usersGet",
		q,
		name,
		apikey,
	});
};

const userPost = async (req, res = response) => {
	const body = req.body;
	const user = new User(body);

	console.log(body);

	try {
		await user.save();
		res.status(201).send({ user });
	} catch (e) {
		res.status(400).send(e);
	}
};

const usersPut = (req, res = response) => {
	const id = req.params.id;

	res.json({
		msg: "put API - usersPut",
		id,
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
