const { RequestError } = require("../../helpers/RequestError.js");
const { favoriteSchema } = require("../../schemas/contacts.js");
const { Product } = require("../../models");

const updateFavorite = async (req, res) => {
  const contactId = req.params.contactId;
  const { favorite } = req.body;

  const { error } = favoriteSchema.validate(req.body);
  if (error) {
    throw RequestError(400, error.message);
  }

  const updatedContact = await Product.findByIdAndUpdate(
    contactId,
    { favorite },
    {
      new: true,
    }
  );
  if (updatedContact) {
    res.status(201).json({
      data: updatedContact,
    });
  } else {
    throw RequestError(404, "Not found");
  }
};

module.exports = updateFavorite;
