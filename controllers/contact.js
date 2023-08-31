const Contact = require("../models/contact");

const create = async (req, res, next) => {
  try {
    await Contact.create(req.body);
    res.send({});
  } catch (error) {
    return next(error);
  }
};

const apicontacts = async (req, res, next) => {
  try {
    const contacts = await Contact.all();
    res.json(contacts);
  } catch (error) {
    next(error);
  }
};

const setAsRead = async (req, res, next) => {
  try {
    await Contact.updateOneById(req.params.id, { read: true });
    const contacts = await Contact.all();
    res.json(contacts);
  } catch (error) {
    next(error);
  }
};

const setAsImportant = async (req, res, next) => {
  try {
    await Contact.updateOneById(req.params.id, { bookmark: req.body.bookmark });
    const contacts = await Contact.all();
    res.json(contacts);
  } catch (error) {
    next(error);
  }
};

module.exports = { create, apicontacts, setAsRead, setAsImportant };
