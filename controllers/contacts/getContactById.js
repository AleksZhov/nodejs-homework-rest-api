const { RequestError } = require("../../helpers");
const { Contact } = require("../../models");

const toGetContactById = async (req, res) => {
  const contactId = req.params.contactId;
  const reqContact = await Contact.findById(contactId);
  if (!reqContact) {
    throw RequestError(404, "Not found");
  } else {
    res.status(200).json({
      data: reqContact,
    });
  }
};

module.exports = toGetContactById;
