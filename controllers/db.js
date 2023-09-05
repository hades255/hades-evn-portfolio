const { getDB } = require("../helpers/db");

const getFromDB = async (req, res, next) => {
  try {
    const data = await getDB(req.params.dbname);
    res.json(data);
  } catch (error) {
    next(error);
  }
};

const setToDB = async (req, res, next) => {
  try {
    console.log(req.body);
    const data = await getDB(req.params.dbname);
    res.json(data);
  } catch (error) {
    next(error);
  }
};

module.exports = { getFromDB, setToDB };
