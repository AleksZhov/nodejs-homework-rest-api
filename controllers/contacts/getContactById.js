const { getContactById } = require("../../models/contacts.js");
const { RequestError } = require("../../helpers/RequestError.js");

const toGetContactById = async (req, res) => {
  const contactId = req.params.contactId;
  const reqContact = await getContactById(contactId);
  if (!reqContact) {
   
    throw RequestError(404, "Not found");
  } else {
    res.status(200).json({
      data: reqContact,
    });
  }
};

module.exports = toGetContactById;
