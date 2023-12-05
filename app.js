const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const signUpRoute = require('./services/signup');
const loginRoute = require('./services/login.js');
const addClass = require('./services/professor/addClass.js');
const professorClasses = require('./services/professor/professorClasses.js');
const studentInClass = require('./services/professor/studentInClass.js');
const addStudent = require('./services/professor/addStudent.js');
const addGrade = require('./services/professor/addGrade.js');
const getGPA = require('./services/professor/getStudentGPA.js');
const getStudentGrade = require('./services/student/getWeightedGrade.js')
const allAssignmentsForClass = require('./services/professor/getAssignmentForClass.js');
const studentsInMore = require('./services/professor/studentsInMore.js');
const studentsInLess = require('./services/professor/studentsInLess.js');
const assignmentAverage = require('./services/professor/assignmentAverage.js');
const getAllProfessor = require('./services/student/getAllProfessors.js');
const totalProfessors = require('./services/student/totalProfessors.js');
const exampleJWT = require('./services/exampleJWT.js');
const getTables = require('./services/getTables.js');
const getAllStudents = require('./services/professor/getAllStudent.js');
const addAssignment = require('./services/professor/addAssignmentToClass.js');
const getClassesForStudent = require('./services/professor/studentClasses.js');
const getGradeForAssignment = require('./services/student/gradeForAssignment.js');

const mysql = require('mysql2');
const fs = require('fs');
const dotenv = require('dotenv').config();

const app = express();
const connectionConfig = {
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database,
    port: process.env.port,
    ssl: { ca: fs.readFileSync('./ca-certificate.crt') }
};

// Configure the database connection
const connection = mysql.createConnection(connectionConfig);


const corsOptions = {
    origin: 'https://cmsc508-frontend-deployment.vercel.app/',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));

// Logging Middleware
app.use((req, res, next) => {
    console.log(`${new Date().toString()} - ${req.method} Request to ${req.url}`);
    next();
});

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Routes
app.use('/api', signUpRoute);
app.use('/api', loginRoute);
app.use('/api', addClass);
app.use('/api', professorClasses);
app.use('/api', studentInClass);
app.use('/api', getGPA);
app.use('/api', addStudent);
app.use('/api/', getStudentGrade);
app.use('/api', addGrade);
app.use('/api', allAssignmentsForClass);
app.use('/api', studentsInMore);
app.use('/api/', studentsInLess);
app.use('/api', assignmentAverage);
app.use('/api', getAllProfessor);
app.use('/api', totalProfessors);
app.use('/api/', exampleJWT);
app.use('/api', getTables);
app.use('/api', getAllStudents);
app.use('/api', addAssignment);
app.use('/api', getClassesForStudent);
app.use('/api', getGradeForAssignment);

app.use((err, req, res, next) => {
    console.error('Error:', err.stack);
    res.status(500).send('Internal Server Error');
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
    
    // Test database connection
    connection.connect(error => {
        if (error) {
            console.error('Error connecting to the database:', error.stack);
            return;
        }
        console.log('Connected to the database successfully.');
    });
});

module.exports = app;
