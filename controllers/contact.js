const { getDB } = require("../helpers/db");
const Contact = require("../models/contact");

const create = async (req, res, next) => {
  try {
    // const contacts = await getDB("contacts");
    // console.log(await Contact.all());
    await Contact.create(req.body);
    res.send({});
  } catch (error) {
    return next(error);
  }
};

module.exports = { create };
