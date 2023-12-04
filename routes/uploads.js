const { Router } = require("express");
const { check } = require("express-validator");

const { validateFields } = require("../middlewares/validate-fields");

const { loadFile, updateImage } = require("../controllers/uploads");
const { collectionsPermitted } = require("../helpers");

const router = Router();

router.post("/", loadFile);

router.put(
	"/:collection/:id",
	[
		check("id", "The id mush be from Mongo").isMongoId(),
		check("collection").custom((c) =>
			collectionsPermitted(c, ["users", "products"])
		),
		validateFields,
	],
	updateImage
);

module.exports = router;
