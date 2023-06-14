const express = require("express");
const multer = require("multer");

const upload = multer({ dest: "../public/images" });

const router = express.Router();

const { hashPassword, verifyPassword } = require("./utils/auth");

const itemControllers = require("./controllers/itemControllers");

router.get("/items", itemControllers.browse);
router.get("/items/:id", itemControllers.read);
router.put("/items/:id", itemControllers.edit);
router.post("/items", itemControllers.add);
router.delete("/items/:id", itemControllers.destroy);

const userControllers = require("./controllers/userControllers");

router.post("/user", hashPassword, userControllers.add);
router.post("/login", userControllers.findByEmailToNext, verifyPassword);

const projectControllers = require("./controllers/projectControllers");

router.get("/project", projectControllers.browse);
router.get("/project/:id", projectControllers.read);
router.put("/project/:id", projectControllers.edit);
router.post("/project", projectControllers.add);
router.delete("/project/:id", projectControllers.destroy);

const imgControllers = require("./controllers/imgControllers");

router.get("/img/project/:projectId", imgControllers.browse);
router.get("/img/:imageName", imgControllers.read);
router.post("/img", upload.single("image"), imgControllers.add);
router.delete("/img/:id", imgControllers.destroy);

module.exports = router;
