const { response } = require("express");

const isAdminRole = (req, res = response, next) => {
	if (!req.user) {
		return res.status(500).json({
			msg: "It is required to verify the role without validating the token first",
		});
	}

	const { role, name } = req.user;

	if (role !== "ADMIN_ROLE") {
		return res.status(401).json({
			msg: `${name} is not and administrator - cant do this`,
		});
	}

	next();
};

module.exports = { isAdminRole };
