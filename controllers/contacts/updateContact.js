const { RequestError } = require("../../helpers");
const { Contact } = require("../../models");

const updateNewContact = async (req, res) => {
  const contactId = req.params.contactId;

 

  const updatedContact = await Contact.findByIdAndUpdate(contactId, req.body, {
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
