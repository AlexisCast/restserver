const { response } = require("express");
const { uploadFile } = require("../helpers");

const loadFile = async (req, res = response) => {
	if (!req.files || Object.keys(req.files).length === 0 || !req.files.file) {
		res.status(400).json({ msg: "No files to upload" });
		return;
	}

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
	res.json({
		id,
		collection,
	});
};

module.exports = {
	loadFile,
	updateImage,
};
