const express = require("express");

const multer = require("multer");
const upload = multer({ dest: "public/uploads/" });

const {
  create,
  apicontacts,
  setAsRead,
  setAsImportant,
} = require("../controllers/contact");
const { signup, signin } = require("../controllers/auth");
const router = express.Router();

/* GET users listing. */
router.post("/signup", signup);
router.post("/signin", signin);

router.post("/contact", create);
router.get("/admin/contacts", apicontacts);
router.post("/admin/contacts/:id/read", setAsRead);
router.post("/admin/contacts/:id/mark", setAsImportant);

router.post("/upload", upload.single("file"), (req, res, next) => {
  res.json({ file: req.file.filename });
});

module.exports = router;
