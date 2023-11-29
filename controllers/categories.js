const { response } = require("express");

const { Category } = require("../models");

const createCategory = async (req, res = response) => {
	const name = req.body.name.toUpperCase();

	const categoryDB = await Category.findOne({ name });

	if (categoryDB) {
		return res.status(400).json({
			msg: `The category ${categoryDB.name}, already exist`,
		});
	}

	//Generate the data to create/save
	const data = {
		name,
		user: req.user._id,
	};

	const category = await new Category(data);

	//Create/Save in DB
	await category.save();

	res.status(201).json({ category });
};

module.exports = { createCategory };
