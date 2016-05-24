var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;
  

var phones = new Schema ({
    home: { type:String },
    work: { type: String }
})

var studentSchema = new Schema({
    name:  {type : String},
    address : {type: String},
    phones:[phones],
    created: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Student", studentSchema);