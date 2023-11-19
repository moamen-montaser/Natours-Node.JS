const express = require('express');
const userController = require('../controller/usersController');
const router = express.Router();

router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);
//Now h3mel 7agat f user wa7ed bs(hdelo id w y3mel el method)
router
  .route('/api/v1/users/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
