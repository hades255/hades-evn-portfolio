const home = async (req, res, next) => {
  res.render("admin/index");
};

module.exports = { home };
