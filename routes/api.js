var express = require("express");
const { create } = require("../controllers/contact");
var router = express.Router();

/* GET users listing. */
router.post("/contact", create);

module.exports = router;
