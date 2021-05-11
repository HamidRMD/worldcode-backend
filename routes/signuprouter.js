const express = require('express');
const router = express.Router();
const { check } = require("express-validator")

const {createuser, getuser} = require('../controller/signupcontroller');

const validsignup = [
  check('vorname').not().isEmpty().withMessage('Vorname muss angegeben werden.').trim(),
  check('nachname').not().isEmpty().withMessage('Nachname muss angegeben werden.').trim(),
  check("email", "geben Sie bitte Ihre email!").trim().isEmail(),
  check("password", "geben Sie bitte Ihre password!").not().isEmpty().isStrongPassword()
]
const validUserUpdate = [
  check('vorname')
    .not()
    .isEmpty()
    .optional()
    .withMessage('Vorname muss angegeben werden.')
    .trim(),
  check('nachname')
    .not()
    .isEmpty()
    .optional()
    .withMessage('Nachname muss angegeben werden.')
    .trim(),
  check('email')
    .isEmail()
    .withMessage('E-Mail-Format ist ungültig.')
    .optional()
    .trim()
    .normalizeEmail(),
  check('password')
    .not()
    .isEmpty()
    .optional()
    .isStrongPassword()
    .withMessage('Password muss angegeben werden.')
    .trim(),
   
];

router
  .route('/')
  .get(getuser)
  .post(validsignup, createuser)




module.exports = router;
