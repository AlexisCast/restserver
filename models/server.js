const express = require("express");
var cors = require("cors");
const { dbConnection } = require("../database/config");

class Server {
	constructor() {
		this.app = express();
		this.port = process.env.PORT || 3000;

		this.paths = {
			users: "/api/users",
			categories: "/api/categories",
			products: "/api/products",
			auth: "/api/auth",
		};

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
		this.app.use(this.paths.users, require("../routes/users"));
		this.app.use(this.paths.auth, require("../routes/auth"));
		this.app.use(this.paths.products, require("../routes/products"));
		this.app.use(this.paths.categories, require("../routes/categories"));
	}

	listen() {
		this.app.listen(this.port, () => {
			console.log("Server running on port", this.port);
		});
	}
}

module.exports = Server;
