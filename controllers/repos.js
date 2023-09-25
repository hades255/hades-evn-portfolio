const Repo = require("../models/Repo");

const store = async (req, res, next) => {
  try {
    const repo = Repo.add(req.body).save();
    res.json(repo);
  } catch (error) {
    return next(error);
  }
};

const destroy = async (req, res, next) => {
  try {
    await Repo.RemoveById(req.params.id);
    console.log(req.params.id);
    const repos = await Repo.all();
    res.json(repos);
  } catch (error) {
    return next(error);
  }
};

const setHome = async (req, res, next) => {
  try {
    await Repo.updateOneById(req.params.id, { home: req.body.home });
    const repos = await Repo.all();
    res.json(repos);
  } catch (error) {
    return next(error);
  }
};

module.exports = { store, destroy, setHome };
