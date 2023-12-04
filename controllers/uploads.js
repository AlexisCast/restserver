const path = require("path");
const fs = require("fs");

const { response } = require("express");
const { uploadFile } = require("../helpers");

const { User, Product } = require("../models");

const loadFile = async (req, res = response) => {
	//Images
	try {
		// const name = await uploadFile(
		// 	req.files,
		// 	["txt", "md", "docx"],
		// 	"texts"
		// );
		const name = await uploadFile(req.files, undefined, "imgs");

		res.json({
			name,
		});
	} catch (error) {
		res.status(400).json({
			msg: error,
		});
	}
};

const updateImage = async (req, res = response) => {
	const { id, collection } = req.params;

	let model;

	switch (collection) {
		case "users":
			model = await User.findById(id);
			if (!model) {
				return res.status(400).json({
					msg: `User ${id}, does not exist.`,
				});
			}
			break;

		case "products":
			model = await Product.findById(id);
			if (!model) {
				return res.status(400).json({
					msg: `Product ${id}, does not exist.`,
				});
			}
			break;

		default:
			return res
				.status(500)
				.json({ msg: "Needs validation contact Administrator" });
	}

	//Clean previous image
	try {
		if (model.img) {
			//Must erase image from server
			const pathImage = path.join(
				__dirname,
				"../uploads",
				collection,
				model.img
			);

			if (fs.existsSync(pathImage)) {
				fs.unlinkSync(pathImage);
			}
		}
	} catch (error) {
		console.log(error);
	}
	const name = await uploadFile(req.files, undefined, collection);
	model.img = name;

	await model.save();

	res.json(model);
};

module.exports = {
	loadFile,
	updateImage,
};
