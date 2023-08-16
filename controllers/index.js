const home = (req, res, next) => {
  res.render("home/index", { title: "Express" });
};

const aboutme = (req, res, next) => {
  res.render("aboutme/index");
};

module.exports = { home, aboutme };
