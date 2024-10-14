const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  getUsers,
  updateUserRole,
  deleteUser,
} = require('../controllers/userController');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/users', getUsers);
router.put('/user/:id', updateUserRole);
router.delete('/user/:id', deleteUser);

module.exports = router;
