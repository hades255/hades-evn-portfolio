const Repo = require("../models/Repo");

const store = async (req, res, next) => {
  try {
    const repo = Repo.add(req.body).save();
    res.json(repo);
  } catch (error) {
    return next(error);
  }
};

module.exports = { store };
