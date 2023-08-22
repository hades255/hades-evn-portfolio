var express = require("express");
const { create, apicontacts,setAsRead, setAsImportant } = require("../controllers/contact");
const { signup, signin } = require("../controllers/auth");
var router = express.Router();

/* GET users listing. */
router.post("/signup", signup);
router.post("/signin", signin);

router.post("/contact", create);
router.get("/admin/contacts", apicontacts);
router.post("/admin/contacts/:id/read", setAsRead)
router.post("/admin/contacts/:id/mark", setAsImportant)

module.exports = router;
