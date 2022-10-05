const { RequestError } = require("../../helpers/RequestError.js");
const { addSchema } = require("../../schemas/contacts.js");
const { Product } = require("../../models");

const addNewContact = async (req, res, next) => {
  const { error } = addSchema.validate(req.body);
  if (error) {
    throw RequestError(400, error.message);
  }
  const addedContact = await Product.create(req.body);
  res.status(201).json({
    data: addedContact,
  });
};

module.exports = addNewContact;
