const express = require("express");

const multer = require("multer");
const upload = multer({ dest: "public/img/repos" });

const {
  create,
  apicontacts,
  setAsRead,
  setAsImportant,
} = require("../controllers/contact");
const { signup, signin } = require("../controllers/auth");
const { store, destroy, setHome } = require("../controllers/repos");
const { authJWT } = require("../middlewares/auth");
const { updateSkills } = require("../controllers/skills");
const {
  getFromDB,
  setToDB,
  downloadDB,
  setToSetting,
} = require("../controllers/db");
const router = express.Router();

/* GET users listing. */
router.post("/signup", signup);
router.post("/signin", signin);

router.post("/contact", create);
router.get("/admin/contacts", apicontacts);
router.post("/admin/contacts/:id/read", setAsRead);
router.post("/admin/contacts/:id/mark", setAsImportant);

router.put("/admin/skills", authJWT, updateSkills);

router.route("/repos/:id").put(setHome).delete(destroy);
router.route("/repos").post(store);

router.route("/db/:dbname").get(getFromDB).post(setToDB).patch(downloadDB);
router.route("/setting/github-token").post(setToSetting);

router.post("/upload", upload.single("file"), (req, res, next) => {
  res.json({ file: req.file.filename });
});

module.exports = router;
