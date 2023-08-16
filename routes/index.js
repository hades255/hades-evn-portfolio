var express = require("express");
const { home, aboutme, portfolio } = require("../controllers");
var router = express.Router();

/* GET home page. */
router.get("/", home);
router.get("/aboutme", aboutme);
router.get("/portfolio", portfolio);

module.exports = router;
