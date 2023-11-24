const { response } = require("express");

const usersGet = (req, res = response) => {
	res.json({
		msg: "get API - usersGet",
	});
};

const userPost = (req, res = response) => {
	res.json({
		msg: "post API - userPost",
	});
};

const usersPut = (req, res = response) => {
	res.json({
		msg: "put API - usersPut",
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
