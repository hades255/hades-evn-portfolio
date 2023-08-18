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

const lineOfCode = async (style = false) => {
  try {
    const repos = await getRepositories();
    let code = repos.reduce((a, b) => a + b.code, 0);
    return style ? numWithSuf(code) : code;
  } catch (error) {
    return false;
  }
};

module.exports = { getRepositories, lineOfCode, numWithSuf };
