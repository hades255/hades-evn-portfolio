const Repo = require("../models/Repo");

const home = async (req, res, next) => {
  try {
    const repos = await Repo.all();
    res.render("admin/index", { repos });
  } catch (error) {
    next(error);
  }
};

module.exports = { home };
