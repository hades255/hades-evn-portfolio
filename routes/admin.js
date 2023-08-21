const express = require("express");
const { auth } = require("../middlewares/auth");
const router = express.Router();

router.get("/", auth("admin"), function (req, res, next) {
  res.render("admin/index");
});

module.exports = router;
