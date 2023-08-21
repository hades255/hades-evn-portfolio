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
    this.updatedAt = new Date();
    return this;
  };
  this.save = async function () {
    try {
      let contacts = await getDB(db);
      contacts.push(this);
      setDB(db, JSON.stringify(contacts));
    } catch (error) {
      console.log(error);
    }
  };
  this.all = async function () {
    try {
      return await getDB(db);
    } catch (error) {}
  };
}

module.exports = Model;
