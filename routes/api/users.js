const express = require("express");
const ctrl = require("../../controllers/users/");
const { ctrlWrapper } = require("../../helpers/");
const { auth, validateBody, upload } = require("../../middlewares");
const {
  addSchema,
  loginSchema,
  changeSubscrSchema,
  repeatedVerifySchema,
} = require("../../schemas/users");

const router = express.Router();

router.post("/signup", validateBody(addSchema), ctrlWrapper(ctrl.addUser));
router.post("/login", validateBody(loginSchema), ctrlWrapper(ctrl.login));
router.get("/current", auth, ctrlWrapper(ctrl.getCurrentUser));
router.get("/logout", auth, ctrlWrapper(ctrl.logout));
router.patch(
  "/avatars",
  auth,
  upload.single("avatar"),
  ctrlWrapper(ctrl.setAvatar)
);
router.patch(
  "/",
  auth,
  validateBody(changeSubscrSchema),
  ctrlWrapper(ctrl.changeSubscription)
);
router.get("/verify/:verificationToken", ctrlWrapper(ctrl.verify));
router.post(
  "/verify",
  validateBody(repeatedVerifySchema),
  ctrlWrapper(ctrl.repeatedVerify)
);
module.exports = router;
