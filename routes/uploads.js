const { Router } = require("express");
const { check } = require("express-validator");

const { validateFields } = require("../middlewares/validate-fields");

const { loadFile, updateImage, showImage } = require("../controllers/uploads");
const { collectionsPermitted } = require("../helpers");
const { validateFileToUpload } = require("../middlewares");

const router = Router();

router.post("/", validateFileToUpload, loadFile);

router.put(
	"/:collection/:id",
	[
		validateFileToUpload,
		check("id", "The id mush be from Mongo").isMongoId(),
		check("collection").custom((c) =>
			collectionsPermitted(c, ["users", "products"])
		),
		validateFields,
	],
	updateImage
);

router.get(
	"/:collection/:id",
	[
		check("id", "The id mush be from Mongo").isMongoId(),
		check("collection").custom((c) =>
			collectionsPermitted(c, ["users", "products"])
		),
		validateFields,
	],
	showImage
);

module.exports = router;
