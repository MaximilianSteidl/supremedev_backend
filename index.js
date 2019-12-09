var express = require('express');
var app = express();
//var Student = require('./student');
var mongoose = require('mongoose');
var cors = require('cors');

const connectToDB = () => {
  mongoose
    .connect('mongodb+srv://SupremeDev:SupremeD3V@cluster0-e8wj6.mongodb.net/joanneum?retryWrites=true&w=majority', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log('Successfully connected to MongoDB'))
    .catch((error) => {
      console.log(`Error connecting to database: ${error}`);
      mongoose.connection.close();
    });
};
connectToDB();


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

app.use(cors());

app.get('/test', function (req, res) {

  Student.find({})
    .then((students) => {
      res.json(students);

    })


});

app.listen('http://github.com/MaximilianSteidl/supremedev_backend/', function () {
  console.log('Example app listening on port 3000!');
});