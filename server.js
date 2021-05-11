
require("dotenv").config();
var express = require('express');
var path = require('path');

const cors=require("./middleware/cors")
const app = express();
const signupRouter = require('./routes/signuprouter');
const LoginRouter = require('./routes/loginRouter');
const QuestionRouter=require("./routes/questions")
const RandomQuestionRouter=require("./routes/randomQuestions")
const verbindeDB = require("./mongo-db");
const { Mongoose } = require("mongoose");
const mongoose=require("mongoose");
const  Questions = require('./models/questions');
const { schema } = require("./models/questions");
verbindeDB()

app.use(express.json());

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors)
app.use("/signup",signupRouter)
app.use("/login",LoginRouter)
app.use("/questions",QuestionRouter)

app.use("/RandomQuestion",RandomQuestionRouter)



app.get('*', (req,res, next) =>{
    res.status(404).send("Diesen Pfad gibt es nicht")
   
    
  })
  
 
  
const port = process.env.PORT || 5000;

app.listen(port, () => { console.log("Läuft auf Port" + port) })

//  für fragenerstelln im browser :http://localhost:5000/form.html