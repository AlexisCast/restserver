const { Router } = require("express");
const { check } = require("express-validator");

const { validateFields } = require("../middlewares/validate-fields");

const {
	usersGet,
	usersPut,
	userPost,
	usersPatch,
	usersDelete,
} = require("../controllers/users");

const router = Router();

router.get("/", usersGet);

router.put("/:id", usersPut);

router.post(
	"/",
	[
		check("name", "The name is required").not().isEmpty(),
		check(
			"password",
			"The password must be more than 6 characters"
		).isLength({ min: 6 }),
		check("email", "The mail is not valid").isEmail(),
		check("role", "It is not a valid rolve").isIn([
			"ADMIN_ROLE",
			"USER_ROLE",
		]),
		validateFields,
	],
	userPost
);

router.patch("/", usersPatch);

router.delete("/", usersDelete);

module.exports = router;
