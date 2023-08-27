const express = require("express");
const { auth } = require("../middlewares/auth");
const { home } = require("../controllers/admin");
const router = express.Router();

router.get("/", auth("admin"), home);

module.exports = router;
