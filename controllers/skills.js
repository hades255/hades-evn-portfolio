const { setSkills } = require("../helpers/db");

const updateSkills = async (req, res, next) => {
  try {
    await setSkills(req.body);
    res.json({ OK: "OK" });
  } catch (error) {
    next(error);
  }
};

module.exports = { updateSkills };
