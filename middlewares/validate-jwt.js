const { response } = require("express");
const jwt = require("jsonwebtoken");

const validateJWT = (req, res = response, next) => {
	const token = req.header("x-token");
	if (!token) {
		return res.status(401).json({
			msg: "There is no token on the request",
		});
	}

	try {
		const { uid } = jwt.verify(token, process.env.SECRETEORPRIVATEKEY);

		req.uid = uid;

		next();
	} catch (error) {
		console.log(error);

		res.status(401).json({
			msg: "Token not valid",
		});
	}
};

module.exports = { validateJWT };
