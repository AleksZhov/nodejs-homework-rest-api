const { Contact } = require("../../models");

const getContactsList = async (req, res) => {
  const { _id } = req.user;
  const { page, limit, favorite } = req.query;
  console.log(page, limit, favorite);

  if (page && limit) {
    const skip = (page - 1) * limit;
    const contactsList = await Contact.find({ owner: _id }, "", {
      skip,
      limit: Number(limit),
    }).populate("owner", "_id email subscription");
    res.status(200).json({
      data: contactsList,
    });
  } else if (favorite !== undefined) {
    const contactsList = await Contact.find({ owner: _id, favorite }).populate(
      "owner",
      "_id email subscription"
    );
    res.status(200).json({
      data: contactsList,
    });
  } else {
    const contactsList = await Contact.find({ owner: _id }).populate(
      "owner",
      "_id email subscription"
    );
    res.status(200).json({
      data: contactsList,
    });
  }
};

module.exports = getContactsList;
