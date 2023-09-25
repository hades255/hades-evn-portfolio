const { getSkills, getSetting } = require("../helpers/db");
const Repo = require("../models/Repo");

const home = async (req, res, next) => {
  try {
    const repos = await Repo.all();
    const skills = await getSkills();
    const setting = await getSetting();
    res.render("admin/index", { repos, skills, token: setting.githubToken });
  } catch (error) {
    next(error);
  }
};

module.exports = { home };
