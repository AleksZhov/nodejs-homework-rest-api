const express = require("express");

const ctrl = require("../../controllers/contacts");
const { ctrlWrapper } = require("../../helpers");
const { auth, validateBody } = require("../../middlewares");
const {
  addSchema,
  updateSchema,
  favoriteSchema,
} = require("../../schemas/contacts");

const router = express.Router();

router.get("/", auth, ctrlWrapper(ctrl.listContacts));

router.get("/:contactId", ctrlWrapper(ctrl.getContactById));

router.post("/", auth, validateBody(addSchema), ctrlWrapper(ctrl.addContact));

router.delete("/:contactId", ctrlWrapper(ctrl.deleteContact));

router.put(
  "/:contactId",
  validateBody(updateSchema),
  ctrlWrapper(ctrl.updateContact)
);

router.patch(
  "/:contactId/favorite",
  validateBody(favoriteSchema),
  ctrlWrapper(ctrl.updateFavorite)
);

module.exports = router;
