const { User } = require("../../models");
const fs = require("fs").promises;
const Jimp = require("jimp");
const path = require("path");
const setAvatar = async (req, res, next) => {
  const { originalname, path: tmpDir } = req.file;
  const { _id } = req.user;
  const newFileName = `${_id}_${originalname}`;
  const avatarURL = `/avatars/${newFileName}`;
  const newUploadPath = path.join(
    __dirname,
    "../../",
    "public",
    "avatars",
    newFileName
  );
  Jimp.read(tmpDir)
    .then((image) => {
      return image.resize(250, 250).write(newUploadPath);
    })
    .catch((err) => {
      next(err);
    });
  await fs.unlink(tmpDir);
  await User.findByIdAndUpdate(_id, { avatarURL });
  await res.json({ avatarURL });
};

module.exports = setAvatar;
