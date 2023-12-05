const { Router } = require("express");
const { check } = require("express-validator");

const { validateFields } = require("../middlewares/validate-fields");

const {
	login,
	googleSignIn,
	forgotPassword,
	updatePassword,
} = require("../controllers/auth");

const router = Router();

router.post(
	"/login",
	[
		check("email", "The email is required").isEmail(),
		check("password", "The password is required").not().isEmpty(),
		validateFields,
	],
	login
);

router.post(
	"/google",
	[check("id_token", "id_token is required").not().isEmpty(), validateFields],
	googleSignIn
);

router.put("/forgot-password", forgotPassword);

router.put("/reset-password", updatePassword);

module.exports = router;
