const router = require('express').Router();

const {
  getUsers,
  getOneUser,
  createUser,
  deleteUser,
  updateUser,
  addFriend,
  removeFriend
} = require('../../controllers/userController');

  // api/users
  router.route('/').get(getUsers).post(createUser);

  // api/users/:userId
  router.route('/:userId').get(getOneUser).delete(deleteUser).put(updateUser);

  // api/users/:userId/friends/:friendId
  router.route('/:userId/friends/:friendId').post(addFriend).delete(removeFriend);

  module.exports = router;