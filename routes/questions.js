

const express = require('express')

const router = express.Router()
const { check } = require("express-validator")


const {getquestion,postquestion,löschfrage,StatsQuestion}=require("../controller/questionscontroller")

const validQuestions = [
  check('question').not().isEmpty().withMessage('question muss angegeben werden.').trim(),
  check('answer').not().isEmpty().withMessage('answer muss angegeben werden.'),
  check("correct", "geben Sie bitte Ihre correct!").trim().isNumeric()
  
]

router.route('/')
.get(getquestion)
  .post(postquestion)

  router
  .route('/:_id')
      
      .delete(löschfrage);

      router.route('/:stats')
.get(StatsQuestion)
 
module.exports=router