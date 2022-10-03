const { addContact } = require("../../models/contacts.js");
const { RequestError } = require("../../helpers/RequestError.js");
const { addSchema } = require("../../schemas/contacts.js");

const addNewContact = async (req, res, next) => {
  const { error } = addSchema.validate(req.body);
  if (error) {
    throw RequestError(400, error.message);
  }
  const addedContact = await addContact(req.body);
  res.status(201).json({
    data: addedContact,
  });
};

module.exports = addNewContact;
