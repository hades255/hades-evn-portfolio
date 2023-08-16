var express = require("express");
const { home, aboutme } = require("../controllers");
var router = express.Router();

/* GET home page. */
router.get("/aboutme", aboutme);
router.get("/", home);

module.exports = router;
