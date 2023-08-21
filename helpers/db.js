const { accessDB, readDB, writeDB } = require("./fs");

const getDB = async (path) => {
  try {
    await accessDB("./db/" + path + ".json");
    const data = await readDB("./db/" + path + ".json");
    return JSON.parse(data);
  } catch (error) {
    return false;
  }
};

const setDB = async (path, data) => {
  try {
    await accessDB("./db/" + path + ".json");
    await writeDB("./db/" + path + ".json", data);
    return true;
  } catch (error) {
    return false;
  }
};

const getRepositories = async () => {
  try {
    await accessDB("./db/repos.json");
    const data = await readDB("./db/repos.json");
    return JSON.parse(data);
  } catch (error) {
    return false;
  }
};

const getSkills = async () => {
  try {
    await accessDB("./db/skills.json");
    const data = await readDB("./db/skills.json");
    return JSON.parse(data);
  } catch (error) {
    return false;
  }
};

const numWithSuf = (num) => {
  let suf = 0;
  const units = "KMGT";
  while (num / 1000 >= 1) {
    suf++;
    num = (num - (num % 1000)) / 1000;
  }
  return {
    num,
    suf: suf ? units[suf - 1] : "",
  };
};

const lineOfCode = (repos, style = false) => {
  let code = repos.reduce((a, b) => a + b.code, 0);
  return style ? numWithSuf(code) : code;
};

module.exports = {
  getRepositories,
  lineOfCode,
  numWithSuf,
  getSkills,
  getDB,
  setDB,
};
