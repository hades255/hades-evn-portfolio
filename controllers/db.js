const fs = require("fs");
const { getDB, setDB, getSetting, setSetting } = require("../helpers/db");

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
    const content = JSON.stringify(req.body.data);
    const data = await setDB(req.params.dbname, content);
    res.json({ msg: data });
  } catch (error) {
    next(error);
  }
};

const downloadDB = async (req, res, next) => {
  const filePath = "./public/download/database.json";
  const content = JSON.stringify(req.body.data);

  fs.open(filePath, "w", (err, fd) => {
    if (err) {
      next(err);
      return;
    }

    fs.writeFile(fd, content, "utf8", (err) => {
      if (err) {
        next(err);
        return;
      }

      fs.close(fd, (err) => {
        if (err) {
          next(err);
          return;
        }
        res.json({ url: "/download/database.json" });
      });
    });
  });
};

const setToSetting = async (req, res, next) => {
  try {
    const setting = await getSetting();
    const data = await setSetting({ ...setting, ...req.body });
    res.json({ msg: data });
  } catch (error) {
    next(error);
  }
};

module.exports = { getFromDB, setToDB, downloadDB, setToSetting };
