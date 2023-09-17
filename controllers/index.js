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
    res.render("home/index", {
      repos: repos.length + Math.round(repos.length * 0.7),
      code,
    });
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
      repos: repos.length + Math.round(repos.length * 0.7),
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
    let tags = [];
    const initTags = ["PHP", "Node", "Laravel", "design"];
    const repos = initRepos.map((repo) => ({
      ...repo,
      code: numWithSuf(repo.code),
    }));
    initRepos.forEach((repo) => {
      repo.tag.forEach((tag) => {
        if (tags.includes(tag) || initTags.includes(tag)) return;
        tags.push(tag);
      });
    });
    tags.sort((a, b) => (a > b ? 1 : a < b ? -1 : 0));
    res.render("portfolio/index", {
      repos,
      code,
      initRepos,
      initTags,
      tags,
    });
  } catch (error) {
    res.render("error", { message: "Express", error });
  }
};

module.exports = { home, aboutme, portfolio };
