const express = require("express");
var cors = require("cors");

class Server {
	constructor() {
		this.app = express();
		this.port = process.env.PORT;
		this.usersPath = "/api/users";

		//Middlewares
		this.middlewares();

		//Application routes
		this.routes();
	}

	middlewares() {
		//CORS
		this.app.use(cors());

		//Public Directory
		this.app.use(express.static("public"));
	}

	routes() {
		this.app.use(this.usersPath, require("../routes/users"));
	}

	listen() {
		this.app.listen(this.port, () => {
			console.log("Server running on port", this.port);
		});
	}
}

module.exports = Server;
