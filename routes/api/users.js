const express = require("express");
const ctrl = require("../../controllers/users/");
const { ctrlWrapper } = require("../../helpers/");
const { auth, validateBody } = require("../../middlewares");
const {
  addSchema,
  loginSchema,
  changeSubscrSchema,
} = require("../../schemas/users");

const router = express.Router();

router.post("/signup", validateBody(addSchema), ctrlWrapper(ctrl.addUser));
router.post("/login", validateBody(loginSchema), ctrlWrapper(ctrl.login));
router.get("/current", auth, ctrlWrapper(ctrl.getCurrentUser));
router.get("/logout", auth, ctrlWrapper(ctrl.logout));
router.patch(
  "/",
  auth,
  validateBody(changeSubscrSchema),
  ctrlWrapper(ctrl.changeSubscription)
);
module.exports = router;
