const express = require("express");
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../../models/contacts.js");

const Joi = require("joi");

const schema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .min(3)
    .required(),
  phone: Joi.string().min(3).required(),
});

const router = express.Router();

router.get("/", async (req, res, next) => {
  const contactsList = await listContacts();
  await res.status(200).json({
    status: "success",
    code: 200,
    data: contactsList,
  });
});

router.get("/:contactId", async (req, res, next) => {
  const contactId = req.params.contactId;
  const reqContact = await getContactById(contactId);
  if (!reqContact) {
    res.status(404).json({
      status: "Error",
      code: 404,
      message: "Not found",
    });
  } else {
    res.status(200).json({
      status: "success",
      code: 200,
      data: reqContact,
    });
  }
});

router.post("/", async (req, res, next) => {
  try {
    const value = await schema.validateAsync(req.body);
    const addedContact = await addContact(value);
    res.status(201).json({
      status: "success",
      code: 201,
      data: addedContact,
    });
  } catch (err) {
    res.status(400).json({
      status: "Error",
      code: 400,
      message: err.details,
    });
  }
});

router.delete("/:contactId", async (req, res, next) => {
  const contactId = req.params.contactId;
  const removedContact = await removeContact(contactId);
  if (removedContact) {
    res
      .status(200)
      .json({ status: "success", code: 200, message: "contact deleted" });
  } else {
    res.status(404).json({ status: "Error", code: 404, message: "Not found" });
  }
});

router.put("/:contactId", async (req, res, next) => {
  const contactId = req.params.contactId;

  try {
    const value = await schema.validateAsync(req.body);
    const updatedContact = await updateContact(contactId, value);
    if (updatedContact) {
      res.status(201).json({
        status: "success",
        code: 201,
        data: updatedContact,
      });
    } else {
      res.status(404).json({
        status: "error",
        code: 404,
        message: "Not found",
      });
    }
  } catch (err) {
    res.status(400).json({
      status: "Error",
      code: 400,
      message: err.details,
    });
  }
});

module.exports = router;
