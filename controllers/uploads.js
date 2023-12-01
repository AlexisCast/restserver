const { response } = require("express");
const { uploadFile } = require("../helpers");

loadFile = async (req, res = response) => {
	if (!req.files || Object.keys(req.files).length === 0 || !req.files.file) {
		res.status(400).json({ msg: "No files to upload" });
		return;
	}

	//Images
	try {
		const name = await uploadFile(req.files);
		res.json({
			name,
		});
	} catch (error) {
		res.status(400).json({
			msg: error,
		});
	}
};

module.exports = {
	loadFile,
};
