const home = (req, res, next) => {
  res.render("home/index", { title: "Express" });
};

const aboutme = (req, res, next) => {
  res.render("aboutme/index");
};

const portfolio = (req, res, next) => {
  res.render("portfolio/index");
};

module.exports = { home, aboutme, portfolio };
