const { response } = require("express");

const search = (req, res = response) => {
	const { collection, phrase } = req.params;

	res.json({
		collection,
		phrase,
	});
};

module.exports = {
	search,
};
