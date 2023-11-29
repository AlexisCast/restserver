const { Router } = require("express");
const { check } = require("express-validator");

const { validateFields } = require("../middlewares/validate-fields");
const { validateJWT } = require("../middlewares/validate-jwt");
const { isAdminRole } = require("../middlewares/validate-roles");

const {
	isRoleValid,
	existEmail,
	existUserByID,
} = require("../helpers/db-validators");

const {
	usersGet,
	usersPut,
	userPost,
	usersPatch,
	usersDelete,
} = require("../controllers/users");

const router = Router();

router.get("/", usersGet);

router.put(
	"/:id",
	[
		check("id", "It is not a valid ID").isMongoId(),
		check("id").custom(existUserByID),
		check("role").custom(isRoleValid),
		validateFields,
	],
	usersPut
);

router.post(
	"/",
	[
		check("name", "The name is required").not().isEmpty(),
		check(
			"password",
			"The password must be more than 6 characters"
		).isLength({ min: 6 }),
		check("email", "The mail is not valid").isEmail(),
		check("email").custom(existEmail),
		// check("role", "It is not a valid rolve").isIn([
		// 	"ADMIN_ROLE",
		// 	"USER_ROLE",
		// ]),
		check("role").custom(isRoleValid),
		validateFields,
	],
	userPost
);

router.patch("/", usersPatch);

router.delete(
	"/:id",
	[
		validateJWT,
		isAdminRole,
		check("id", "It is not a valid ID").isMongoId(),
		check("id").custom(existUserByID),
		validateFields,
	],
	usersDelete
);

module.exports = router;
