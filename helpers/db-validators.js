const Role = require("../models/role");
const User = require("../models/user");

const isRoleValid = async (role = "") => {
	const existRole = await Role.findOne({ role });
	if (!existRole) {
		throw new Error(`The role ${role} is not registered in the DB`);
	}
};

const existEmail = async (email = "") => {
	const existEmail = await User.findOne({ email });
	if (existEmail) {
		throw new Error(`The email: ${email}, is already registered`);
	}
};

module.exports = { isRoleValid, existEmail };
