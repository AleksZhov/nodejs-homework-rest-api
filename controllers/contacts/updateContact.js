const { RequestError } = require("../../helpers/RequestError.js");
const { updateSchema } = require("../../schemas/contacts.js");
const { Product } = require("../../models");

const updateNewContact = async (req, res) => {
  const contactId = req.params.contactId;

  const { error } = updateSchema.validate(req.body);
  if (error) {
    throw RequestError(400, error.message);
  }

  const updatedContact = await Product.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (updatedContact) {
    res.status(201).json({
      data: updatedContact,
    });
  } else {
    throw RequestError(404, "Not found");
  }
};

module.exports = updateNewContact;
