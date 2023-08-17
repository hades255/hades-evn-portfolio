const home = async (req, res, next) => {
  try {
    res.render("home/index", { title: "Express" });
  } catch (error) {
    res.render("home/index", { msg: "Express", error });
  }
};

const aboutme = async (req, res, next) => {
  res.render("aboutme/index");
};

const portfolio = async (req, res, next) => {
  res.render("portfolio/index");
};

module.exports = { home, aboutme, portfolio };
