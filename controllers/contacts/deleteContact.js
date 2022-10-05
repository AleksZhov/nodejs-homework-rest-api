const { Product } = require("../../models");

const { RequestError } = require("../../helpers/RequestError.js");

const deleteContact = async (req, res) => {
  const contactId = req.params.contactId;
  const removedContact = await Product.findByIdAndRemove(contactId);
  console.log(removedContact);
  if (removedContact) {
    res.status(200).json({ message: "contact deleted" });
  } else {
    throw RequestError(404, "Not found");
  }
};

module.exports = deleteContact;
