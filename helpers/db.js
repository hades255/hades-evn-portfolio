const { accessDB, readDB } = require("./fs");

const getRepositories = async () => {
  try {
    await accessDB("./db/repos.json");
    const data = await readDB("./db/repos.json");
    return JSON.parse(data);
  } catch (error) {
    return false;
  }
};

const lineOfCode = async (style = false) => {
  try {
    const repos = await getRepositories();
    let code = repos.reduce((a, b) => a + b.code, 0);
    if (style) {
      let suf = 0;
      const units = "KMGT";
      while (code / 1000 >= 1) {
        suf++;
        code = (code - (code % 1000)) / 1000;
      }
      return {
        code,
        suf: suf ? units[suf - 1] : "",
      };
    }
    return code;
  } catch (error) {
    return false;
  }
};

module.exports = { getRepositories, lineOfCode };
