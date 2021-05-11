

const express = require('express')

const router = express.Router()


const {GetRandomQuestion,StatsRandomQuestion}=require("../controller/randomQuestions")



router.route('/')
.get(GetRandomQuestion)
 
router.route('/:stats')
.get(StatsRandomQuestion)
 

module.exports=router