const { RequestError } = require("../../helpers");

const { Contact } = require("../../models");

const updateFavorite = async (req, res) => {
  const contactId = req.params.contactId;
  const { favorite } = req.body;

  const updatedContact = await Contact.findByIdAndUpdate(
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
