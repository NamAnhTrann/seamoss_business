const Contact = require("../schema/user/contactUsSchema");

module.exports = {
  addContact: async function (req, res) {
    try {
      const newContact = new Contact({ ...req.body });
      await newContact.save();
      return res.status(201).json(newContact);
    } catch (err) {
      return res
        .status(500)
        .json({ message: "error, cannot add contact", err });
    }
  },

  listContact: async function (req, res) {
    //todo
  },
};
