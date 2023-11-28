const { response } = require("express");
const bcryptjs = require("bcryptjs");

const User = require("../models/user");

const login = async (req, res = response) => {
	const { email, password } = req.body;

	try {
		//Validate if the email exist
		const user = await User.findOne({ email });
		if (!user) {
			return res.status(400).send({
				msg: "User / Password are not correct - email",
			});
		}

		//if the user is ACTIVE
		if (!user.state) {
			return res.status(400).send({
				msg: "User / Password are not correct - state:false",
			});
		}

		//Verify password
		const validPassword = bcryptjs.compareSync(password, user.password);
		if (!validPassword) {
			return res.status(400).send({
				msg: "User / Password are not correct - password",
			});
		}

		//Generate JWT

		res.json({
			msg: "Login ok",
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			msg: "Contact the administrator",
		});
	}
};

module.exports = { login };
