const { User } = require("../../models");
const { RequestError } = require("../../helpers");
const changeSubscription = async (req, res) => {
  const { _id } = req.user;
 
  const requestedUser = await User.findByIdAndUpdate(_id, req.body, {
    new: true,
  });
  if (requestedUser) {
    res.status(201).json({
      data: requestedUser,
    });
  } else {
    throw RequestError(404, "Not found");
  }
};

module.exports = changeSubscription;
