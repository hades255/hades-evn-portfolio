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
  this.createdAt = new Date();
  this.updatedAt = "";
  this.id = generateRandomId();

  this.add = function (data) {
    for (let [key, value] of Object.entries(data)) {
      this[key] = value;
    }
    return this;
  };

  this.save = async function (isNew = true) {
    try {
      this.updatedAt = new Date();
      let list = await getDB(db);
      if (isNew) list.push(this);
      else {
        list = list.map((item) => (item.id === this.id ? this : item));
      }
      await setDB(db, JSON.stringify(list));
      return this;
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
  this.findOneById = async function (value) {
    try {
      const data = await this.all();
      for (let item of data) {
        if (item.id === value) return new Model(db).add({ ...this, ...item });
      }
      return null;
    } catch (error) {
      return error;
    }
  };
  this.updateOneById = async function (id, data) {
    try {
      const item = await this.findOneById(id);
      return await item.add(data).save(false);
    } catch (error) {
      return error;
    }
  };
}

module.exports = Model;
