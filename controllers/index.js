const {
  getRepositories,
  lineOfCode,
  numWithSuf,
  getSkills,
} = require("../helpers/db");

const home = async (req, res, next) => {
  try {
    const repos = await getRepositories();
    const code = lineOfCode(repos, true);
    res.render("home/index", { repos: repos.length, code });
  } catch (error) {
    res.render("error", { message: "Express", error });
  }
};

const aboutme = async (req, res, next) => {
  try {
    const repos = await getRepositories();
    const code = lineOfCode(repos, true);
    const skills = await getSkills();
    res.render("aboutme/index", {
      repos: repos.length,
      code,
      skills,
    });
  } catch (error) {
    res.render("error", { message: "Express", error });
  }
};

const portfolio = async (req, res, next) => {
  try {
    let initRepos = await getRepositories();
    const code = lineOfCode(initRepos);
    const repos = initRepos.map((repo) => ({
      ...repo,
      code: numWithSuf(repo.code),
    }));

    res.render("portfolio/index", {
      repos,
      code,
      initRepos,
    });
  } catch (error) {
    res.render("error", { message: "Express", error });
  }
};

module.exports = { home, aboutme, portfolio };
