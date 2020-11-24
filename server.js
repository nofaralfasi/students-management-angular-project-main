const express = require('express');
const app = express(),
      bodyParser = require("body-parser");
      port = 8080;

const students = [
	{	
		id : 1,
		first_name : "Nofar",
		last_name : "Alfasi",
		address : "Remez 20",
		city : "Rishon Lezion",
		state : "Israel",
		grade : 1
	},
	{
		id : 2,
		first_name : "Oman",
		last_name : "Umir",
		address : "Remez 20",
		city : "Rishon Lezion",
		state : "Israel",
		grade : 2
	},
	{
		id : 3,
		first_name : "Tina",
		last_name : "Dillon",
		address : "Remez 20",
		city : "Rishon Lezion",
		state : "Israel",
		grade : 3
	},
	{
		id : 4,
		first_name : "John",
		last_name : "Doe",
		address : "Remez 20",
		city : "Rishon Lezion",
		state : "Israel",
		grade : 4
	},
	{
		id : 5,
		first_name : "Peter",
		last_name : "Parker",
		address : "Remez 20",
		city : "Rishon Lezion",
		state : "Israel",
		grade : 5
	}
	];

app.use(bodyParser.json());
app.use(express.static(process.cwd()+"/client/dist/"));

app.get('/api/users', (req, res) => {
  res.json(students);
});

app.get('/api/students', (req, res) => {
  res.json(students);
});

app.post('/api/user', (req, res) => {
  const user = req.body.user;
  students.push(user);
  res.json("user addedd");
});

app.post('/api/student/add', (req, res) => {
  const student = req.body.student;
  students.push(student);
  console.log(`Server add on the port::${port}`);
  res.json("user addedd");
});

app.get('/', (req,res) => {
  res.sendFile(process.cwd()+"/client/dist/index.html")
});

app.delete('/api/student/:id', (req, res) => {
  console.log(`Server delete on the port::${port}`);
  res.json(students);
  // res.sendStatus(204)
});

app.delete('/api/student/id', (req, res) => {
  console.log(`Server delete2 on the port::${port}`);
  res.json(students);
  // res.sendStatus(204)
});

app.listen(port, () => {
    console.log(`Server listening on the port::${port}`);
});
