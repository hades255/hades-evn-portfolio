const { getSkills } = require("../helpers/db");
const Repo = require("../models/Repo");

const home = async (req, res, next) => {
  try {
    const repos = await Repo.all();
    const skills = await getSkills();
    res.render("admin/index", { repos, skills });
  } catch (error) {
    next(error);
  }
};

module.exports = { home };
