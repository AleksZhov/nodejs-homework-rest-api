const listContacts = require("./listContacts.js");
const getContactById = require("./getContactById.js");
const addContact = require("./addContact");
const deleteContact = require("./deleteContact");
const updateContact = require("./updateContact");
const updateFavorite = require("./updateFavorite.js");

module.exports = {
  listContacts,
  getContactById,
  addContact,
  deleteContact,
  updateContact,
  updateFavorite,
};
