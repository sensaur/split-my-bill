// const userModel = require('../models/user.model')
const { User, Bill, Bill_Split } = require("../db/models");

const editUser = async (req, res) => {
  let updatedFields = Object.entries(req.body).filter((el) => el[1].trim());
  if (updatedFields.length) {
    const id = req.session.user.id;
    updatedFields = Object.fromEntries(updatedFields);
    try {
      const updatedUser = await User.update(updatedFields, {
        where: { id: id },
        returning: true,
        plain: true,
        // raw: true,
      });
      return res.json(updatedUser[1]).status(200);
    } catch (error) {
      return res.sendStatus(500);
    }
  }
  return res.sendStatus(418);
};

const getUser = async (req, res) => {
  const { id } = req.params;
  const currentUserBills = await Bill.findAll({
    include: { model: Bill_Split, where: { user_id: id } },
    raw: true,
    nest: true,
  });
  setTimeout(() => {
    res.json(currentUserBills);
  }, 1000);
};

const getAllUsers = async (req, res) => {
  try {
    const allUsers = await User.findAll();
    return res.json(allUsers);
  } catch (error) {
    return res.sendStatus(500);
  }
};

module.exports = {
  editUser,
  getUser,
  getAllUsers,
};
