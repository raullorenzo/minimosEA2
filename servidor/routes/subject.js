module.exports = function (app) {

    var Student = require('../models/student.js');
    var Subject = require('../models/subject.js');

    addSubject = function (req, res) {
        var subject = new Subject({
            name: req.body.name,
            subject: []
        })
        subject.save(function (err, subject) {
            console.log('POST');
            console.log(subject.name);
            console.log(subject.subject);
            if (err) return res.send(500, err.message);
            res.status(200).json(subject);
        });
    };

    AllSubject = function (req, res) {
        Subject.find({}, function(err, students) {
            console.log("GET POPULATE");
            console.log(students);
            Student.populate(students, {path: "students"},function(err, students){
            res.status(200).send(students);
            console.log(students);
            }); 
         });
    };

    findSubjects = function (req, res) {
        console.log (req.params.name);
        Subject.find({name: req.params.name}, function (err, students) {
            Student.populate(students, {path: "students"}, function (err, students) {
                res.status(200).send(students);
                console.log(students);
            });
        });
    };

    addStudentToSubject = function (req, res) {
        console.log('POST');
        console.log(req.params.name);
        console.log(req.params.student_name);
        Student.findOne({name: req.params.student_name},function(err,student){
            if(err) return err.message("ERROR");
            else {
                console.log(student);
                console.log(student.name);
                console.log(student._id);
                Subject.findOneAndUpdate({name: req.params.name}, {$push: {students: student._id}}, function (err, result) {
                    console.log(result);
                    res.send(result);
                });
            }
        });
    };

    app.post('/addsubject', addSubject);
    app.get('/allsubject',AllSubject);
    app.get('/subject/:name', findSubjects);
    app.put('/addstudenttosubject/:name/:student_name',addStudentToSubject);
}
