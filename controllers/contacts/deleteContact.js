const { Contact } = require("../../models");

const { RequestError } = require("../../helpers");

const deleteContact = async (req, res) => {
  const contactId = req.params.contactId;
  const removedContact = await Contact.findByIdAndRemove(contactId);
  console.log(removedContact);
  if (removedContact) {
    res.status(200).json({ message: "contact deleted" });
  } else {
    throw RequestError(404, "Not found");
  }
};

module.exports = deleteContact;
