const mongoose = require('mongoose');

const studentSchema = mongoose.Schema({


    id: String,
    vorname: String,
    nachname: String,
    studiengang: String,
    Geburtsdatum: String,
    wohnort: String,
    semester: String,

});

const Student = mongoose.model('Student', studentSchema);

module.export = Student;