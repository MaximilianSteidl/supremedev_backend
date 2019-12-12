var express = require('express');
var app = express();
//var Student = require('./student');
var mongoose = require('mongoose');
var cors = require('cors');
var qs = require('querystring');

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

app.get('/', function (req, res) {

  Student.find({})
    .then((students) => {
      res.json(students);

    })


});

app.get('/getStudent', function (req, res) {

  //console.log(req.query);
  var query = { "_id" :  req.query.id };
  //console.log("Searching for student with id: " + req.query.id);
  Student.find(query)
    .then((students) => {
      //console.log(students);
	  res.json(students);
    })


});


app.post('/updateStudent', function (req, res) {
    var body = '';
	req.on('data', function (data) {
		body += data;

		// Too much POST data, kill the connection!
		// 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
		if (body.length > 1e6)
			req.connection.destroy();
	});

	req.on('end', function () {
		  var post = qs.parse(body);
		  var myquery = { "_id": post['id'] };
		  var newvalues = { $set: {"id"          : post['Student_id']
								 , "vorname"     : post['vorname']
								// , "nachname"    : req.params.nachname
								// , "studiengang" : req.params.studiengang
								// , "wohnort"     : req.params.wohnort
								// , "semester"    : req.params.semester
								} };
		  Student.updateOne(myquery, newvalues, function(err, res) {
			if (err) throw err;
			console.log("1 Student updated");
		  });
	});
  



});
app.listen(8080, function () {
  console.log('Example app listening on port 8080!');
});