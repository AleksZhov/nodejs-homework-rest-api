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
  try {
    const contactsList = await getContactsList();
    return contactsList;
  } catch (error) {
    console.log(error.message);
  }
};

const getContactById = async (contactId) => {
  try {
    const contactsList = await getContactsList();
    const reqContact = await contactsList.find(
      (contact) => contact.id === contactId
    );
    if (!reqContact) {
      return null;
    }
    return reqContact;
  } catch (error) {
    console.log(error.message);
  }
};

const removeContact = async (contactId) => {
  try {
    const contactsList = await getContactsList();
    const idx = contactsList.findIndex(
      (contact) => contact.id === contactId.toString()
    );
    if (idx === -1) {
      return null;
    }
    const removedContact = contactsList[idx];
    contactsList.splice(idx, 1);
    await updateContact(contactsList);
    return removedContact;
  } catch (error) {
    console.log(error.message);
  }
};

const addContact = async (body) => {
  try {
    const newContact = { id: uuidv4(), ...body };
    const contactsList = await getContactsList();
    const newContactsList = await [...contactsList, newContact];
    await updateContactList(newContactsList);
    return newContact;
  } catch (error) {
    console.log(error.message);
  }
};

const updateContact = async (contactId, body) => {
  try {
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
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
