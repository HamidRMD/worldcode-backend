
const express = require('express')
const router = express.Router()
//const auth = require("../middleware/auth")
const { getlogin, postlogin } = require("../controller/logincontroller")

router.route('/')
  .get(getlogin)
  .post(postlogin)


module.exports = router