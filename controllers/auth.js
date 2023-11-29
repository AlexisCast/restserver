const { response } = require("express");
const bcryptjs = require("bcryptjs");

const User = require("../models/user");

const { generateJWT } = require("../helpers/generate-jwt");
const { googleVerify } = require("../helpers/google-verify");

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
		const token = await generateJWT(user.id);

		res.json({
			user,
			token,
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			msg: "Contact the administrator",
		});
	}
};

const googleSignIn = async (req, res = response) => {
	const { id_token } = req.body;

	try {
		const { googleUser } = await googleVerify(id_token);

		console.log(googleUser);

		res.json({
			msg: "all good! google signIn",
			id_token,
		});
	} catch (error) {
		json.status(400).json({
			ok: false,
			msg: "Token could not be verified",
		});
	}
};

module.exports = { login, googleSignIn };
