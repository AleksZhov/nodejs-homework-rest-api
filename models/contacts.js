const fs = require("fs/promises");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const contactsPath = path.join(__dirname, "contacts.json");

const getContactsList = async () => {
  const data = await fs.readFile(contactsPath);
  const contactsList = await JSON.parse(data);
  return contactsList;
};

const updateContactList = async (data) => {
  await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
};

const listContacts = async () => {
  const contactsList = await getContactsList();
  return contactsList;
};

const getContactById = async (contactId) => {
  const contactsList = await getContactsList();
  const reqContact = await contactsList.find(
    (contact) => contact.id === contactId
  );
  if (!reqContact) {
    return null;
  }
  return reqContact;
};

const removeContact = async (contactId) => {
  const contactsList = await getContactsList();
  const idx = contactsList.findIndex(
    (contact) => contact.id === contactId.toString()
  );
  if (idx === -1) {
    return null;
  }
  const removedContact = contactsList[idx];
  contactsList.splice(idx, 1);
  await updateContactList(contactsList);
  return removedContact;
};

const addContact = async (body) => {
  const newContact = { id: uuidv4(), ...body };
  const contactsList = await getContactsList();
  const newContactsList = await [...contactsList, newContact];
  await updateContactList(newContactsList);
  return newContact;
};

const updateContact = async (contactId, body) => {
  const contactsList = await getContactsList();
  const idx = await contactsList.findIndex(
    (contact) => contact.id === contactId
  );
  if (idx === -1) {
    return null;
  }
  const updatedContact = { ...contactsList[idx], ...body };
  contactsList.splice(idx, 1, updatedContact);
  await updateContactList(contactsList);
  return updatedContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
