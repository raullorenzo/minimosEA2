module.exports = function (app) {

    var Student = require('../models/student.js');
    var Subject = require('../models/subject.js');

   allStudent = function (req, res) {
        console.log("ok populate");
        Student.find({}, function(err, student) {
            Student.populate(student, {path: "student"},function(err, student){
            res.status(200).send(student);
            }); 
         });
    };

    addStudent = function (req, res) {
        var phones = new Student ({
            home:req.body.home,
            work:req.body.work
        })
        var student = new Student({
            name: req.body.name,
            address: req.body.address,
            phones:req.body.phones
        })
        student.save(function (err, student) {
            if (err) return res.send(500, err.message);
            res.status(200).json(student);
        });
    };
    
    findStudent = function (req, res) {
        console.log (req.params.name);
        Student.find({name: req.params.name}, function (err, student) {
            Student.populate(student, {path: "student"}, function (err, student) {
                res.status(200).send(student);
                console.log(student);
            });
        });
    };

    app.get('/allstudent', allStudent);
    app.get('/student/:name', findStudent);
    app.post('/addstudent', addStudent);
}
