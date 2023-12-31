const { response } = require("express");

const isAdminRole = (req, res = response, next) => {
	const { role, name } = req.user;

	if (role !== "ADMIN_ROLE") {
		return res.status(401).json({
			msg: `${name} is not and administrator - cant do this`,
		});
	}

	next();
};

const hasRole = (...roles) => {
	return (req, res = response, next) => {
		if (!req.user) {
			return res.status(500).json({
				msg: "It is required to verify the role without validating the token first",
			});
		}

		if (!roles.includes(req.user.role)) {
			return res.status(401).json({
				msg: `The services requires one of these roles ${roles}`,
			});
		}
		next();
	};
};
module.exports = { isAdminRole, hasRole };
