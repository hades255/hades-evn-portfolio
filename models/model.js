const { getDB, setDB } = require("../helpers/db");

function generateRandomId() {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const now = new Date();
  const timestamp = now.getTime().toString();
  let id = "";

  for (let i = 0; i < 16; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    id += characters.charAt(randomIndex);
  }

  return timestamp + id;
}

function Model(db) {
  this.id = "";
  this.createdAt = "";
  this.updatedAt = "";

  this.add = function (data) {
    for (let [key, value] of Object.entries(data)) {
      this[key] = value;
    }
    this.id = generateRandomId();
    this.createdAt = new Date();
    return this;
  };

  this.save = async function () {
    try {
      this.updatedAt = new Date();
      let contacts = await getDB(db);
      contacts.push(this);
      setDB(db, JSON.stringify(contacts));
    } catch (error) {
      return error;
    }
  };

  this.all = async function () {
    try {
      return await getDB(db);
    } catch (error) {
      return error;
    }
  };

  this.findOne = async function (key, value) {
    try {
      const data = await this.all();
      for (let item of data) {
        if (item[key] === value) return new Model(db).add({ ...this, ...item });
      }
      return null;
    } catch (error) {
      return error;
    }
  };
}

module.exports = Model;
