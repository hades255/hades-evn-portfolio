var express = require("express");
const { create } = require("../controllers/contact");
const { signup, signin } = require("../controllers/auth");
var router = express.Router();

/* GET users listing. */
router.post("/contact", create);
router.post("/signup", signup);
router.post("/signin", signin);

module.exports = router;
