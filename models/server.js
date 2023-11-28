const express = require("express");
var cors = require("cors");
const { dbConnection } = require("../database/config");

class Server {
	constructor() {
		this.app = express();
		this.port = process.env.PORT || 3000;

		this.usersPath = "/api/users";
		this.authPath = "/api/auth";

		//Connect to data base
		this.connectDB();

		//Middlewares
		this.middlewares();

		//Application routes
		this.routes();
	}

	async connectDB() {
		await dbConnection();
	}

	middlewares() {
		//CORS
		this.app.use(cors());

		//Read & parse from body
		this.app.use(express.json());

		//Public Directory
		this.app.use(express.static("public"));
	}

	routes() {
		this.app.use(this.authPath, require("../routes/auth"));
		this.app.use(this.usersPath, require("../routes/users"));
	}

	listen() {
		this.app.listen(this.port, () => {
			console.log("Server running on port", this.port);
		});
	}
}

module.exports = Server;
