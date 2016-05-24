var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;
var Student = mongoose.model('Student');


var subjectSchema = new Schema({
    name: {type : String},
    students:  
    [{ 
    	type: Schema.ObjectId, 
    	ref: "Student" 
    }],
    created: {
        type: Date,
        default: Date.now
    }
});
module.exports = mongoose.model("Subject", subjectSchema);