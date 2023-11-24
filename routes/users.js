const { Router } = require("express");
const {
	usersGet,
	usersPut,
	userPost,
	usersPatch,
	usersDelete,
} = require("../controllers/users");

const router = Router();

router.get("/", usersGet);

router.put("/", usersPut);

router.post("/", userPost);

router.patch("/", usersPatch);

router.delete("/", usersDelete);

module.exports = router;
