const { Router } = require("express");
const { check } = require("express-validator");

const { validateFields } = require("../middlewares/validate-fields");

const router = Router();

//Get all the categories - public
router.get("/", (req, res) => {
	res.json("ok");
});

//Get a category by id - public
router.get("/:id", (req, res) => {
	res.json("get - id");
});

//Create category - private - any with valid token
router.post("/", (req, res) => {
	res.json("post - Create category");
});

//Update - private- any with valid token
router.put("/:id", (req, res) => {
	res.json("put");
});

//Delete a category - Admin
router.delete("/:id", (req, res) => {
	res.json("delete");
});

module.exports = router;
