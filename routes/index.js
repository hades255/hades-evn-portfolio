var express = require("express");
const { home, aboutme, portfolio } = require("../controllers");
const { login } = require("../controllers/auth");
var router = express.Router();

/* GET home page. */
router.get("/", home);
router.get("/aboutme", aboutme);
router.get("/login", login);
router.get("/portfolio", portfolio);

module.exports = router;
