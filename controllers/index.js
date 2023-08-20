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
    res.render("home/index", { title: "Express", repos: repos.length, code });
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
      title: "Express",
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
    let repos = await getRepositories();
    const code = lineOfCode(repos);
    let languages = {};
    repos.forEach((repo) => {
      repo.languages.forEach((lan) => {
        languages[lan.name] = languages[lan.name]
          ? languages[lan.name] + (lan.rate * repo.code) / 100
          : (lan.rate * repo.code) / 100;
      });
    });
    let languagesA = [];
    let others = 0;
    for (let [key, value] of Object.entries(languages)) {
      if (value / code < 0.01) {
        others += value / code;
        continue;
      }
      languagesA.push({
        label: key,
        y: (value / code) * 100,
        x: numWithSuf(value).num,
        z: numWithSuf(value).suf,
      });
    }
    if (others)
      languagesA.push({
        label: "Others",
        y: others * 100,
        x: numWithSuf(others * code).num,
        z: numWithSuf(others * code).suf,
      });
    repos = repos.map((repo) => ({ ...repo, code: numWithSuf(repo.code) }));

    res.render("portfolio/index", {
      title: "Express",
      repos,
      languages: languagesA,
      code: numWithSuf(code),
    });
  } catch (error) {
    res.render("error", { message: "Express", error });
  }
};

module.exports = { home, aboutme, portfolio };
