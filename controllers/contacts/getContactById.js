const { RequestError } = require("../../helpers/RequestError.js");
const { Product } = require("../../models");

const toGetContactById = async (req, res) => {
  const contactId = req.params.contactId;
  const reqContact = await Product.findById(contactId);
  if (!reqContact) {
    throw RequestError(404, "Not found");
  } else {
    res.status(200).json({
      data: reqContact,
    });
  }
};

module.exports = toGetContactById;
