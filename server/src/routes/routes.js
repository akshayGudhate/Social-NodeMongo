const express = require('express');                         // express server
// middleware
const { authToken } = require('../middlewares/auth');       // middleware - authenticateToken
// router
const router = express.Router();

//////////////////////
//      routes      //
//////////////////////

// auth
router.use('/auth', require('../controllers/auth'));

// user
router.use('/article', authToken, require('../controllers/articles'));



module.exports = router;