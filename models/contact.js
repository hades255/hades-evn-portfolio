const Model = require("./model");

const Contact = new Model("contacts");
Contact.create = function (data) {
  this.add({ ...data, read: false, bookmark: false }).save();
};

module.exports = Contact;
