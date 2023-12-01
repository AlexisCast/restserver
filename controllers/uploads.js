const { response } = require("express");

loadFile = (req, res = response) => {
	res.json({
		msg: "Upload..",
	});
};

module.exports = {
	loadFile,
};
