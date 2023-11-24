const { response } = require("express");

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

const userPost = (req, res = response) => {
	const { name, age } = req.body;

	res.json({
		msg: "post API - userPost",
		name,
		age,
	});
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
