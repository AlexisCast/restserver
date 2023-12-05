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
		const { email, name, img } = await googleVerify(id_token);

		let user = await User.findOne({ email });

		if (!user) {
			const data = {
				name,
				email,
				password: "googleUser",
				img,
				google: true,
			};

			user = new User(data);
			await user.save();
		}

		//If the user in DB
		if (!user.state) {
			return res.status(401).json({
				msg: "Contact the administrator, user blocked",
			});
		}

		//Generate JWT
		const token = await generateJWT(user.id);

		res.json({
			user,
			token,
		});
	} catch (error) {
		res.status(400).json({
			ok: false,
			msg: `Google Token could not be verified - ${error}`,
		});
	}
};

const forgotPassword = (req, res = response) => {
	const email = req.body.email;

	return res.send({
		msg: "forgotPassword",
		email,
	});
};

const updatePassword = (req, res = response) => {
	const { token, password } = req.body;

	return res.send({
		msg: "updatePassword",
		token,
		password,
	});
};

module.exports = { login, googleSignIn, forgotPassword, updatePassword };
