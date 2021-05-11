const mongoose = require("mongoose");
const { Schema } = mongoose;

const Questions = new Schema(
    {

        question: String,

        answer: [{
            type: String
        }],
       correct:Number,
       stats:String,
       image:String
    
    }



);

module.exports = mongoose.model("test", Questions);