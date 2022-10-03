const { updateContact } = require("../../models/contacts.js");
const { RequestError } = require("../../helpers/RequestError.js");
const { updateSchema } = require("../../schemas/contacts.js");

const updateNewContact = async (req, res) => {
  const contactId = req.params.contactId;

  const { error } = updateSchema.validate(req.body);
  if (error) {
    throw RequestError(400, error.message);
  }

  const updatedContact = await updateContact(contactId, req.body);
  if (updatedContact) {
    res.status(201).json({
      data: updatedContact,
    });
  } else {
    throw RequestError(404, "Not found");
  }
};

module.exports = updateNewContact;
