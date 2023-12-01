const path = require("path");

const { response } = require("express");

loadFile = (req, res = response) => {
	if (!req.files || Object.keys(req.files).length === 0 || !req.files.file) {
		res.status(400).json({ msg: "No files to upload" });
		return;
	}

	const { file } = req.files;
	const nameCut = file.name.split(".");
	const extension = nameCut[nameCut.length - 1];

	//Validate extention
	const validExtensions = ["png", "jpg", "jpeg", "gif"];
	if (!validExtensions.includes(extension)) {
		return res.status(400).json({
			msg: `The extention ${extension} is not valid, must be ${validExtensions}`,
		});
	}

	res.json({
		extension,
	});

	/* 	
  const uploadPath = path.join(__dirname, "../uploads/", file.name);

	file.mv(uploadPath, (err) => {
		if (err) {
			return res.status(500).json({ err });
		}

		res.json({ msg: "File uploaded to " + uploadPath });
	}); 
  */
};

module.exports = {
	loadFile,
};
