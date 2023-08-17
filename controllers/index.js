const { getRepositories, lineOfCode } = require("../helpers/db");

const home = async (req, res, next) => {
  try {
    const repos = (await getRepositories()).length;
    const code = await lineOfCode(true);
    res.render("home/index", { title: "Express", repos, code });
  } catch (error) {
    res.render("error", { message: "Express", error });
  }
};

const aboutme = async (req, res, next) => {
  try {
    const repos = (await getRepositories()).length;
    const code = await lineOfCode(true);
    res.render("aboutme/index", { title: "Express", repos, code });
  } catch (error) {
    res.render("error", { message: "Express", error });
  }
};

const portfolio = async (req, res, next) => {
  res.render("portfolio/index");
};

module.exports = { home, aboutme, portfolio };
