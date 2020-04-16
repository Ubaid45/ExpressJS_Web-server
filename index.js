const startupDebugger = require("debug")('app:startup');
const dbDebugger = require("debug")('app:db');
const config = require("config");
const Joi = require("joi");
const helmet = require("helmet");
const morgan = require("morgan");
const logger = require("./logger");
const express = require("express");
const app = express();

// Configuration
console.log("Application Name: " + config.get('name'));
console.log("Mail server: " + config.get('mail.host'));
console.log("Mail password: " + config.get('mail.password'));


if (app.get('env') === 'development') {
    app.use(morgan('tiny'));
    startupDebugger('Morgan enabled...');
}

// DB work
dbDebugger("Connected to the database");
//Built-in middlewares
app.use(express.json()); //req.body
app.use(express.urlencoded({ extended: true })); //key=value&key=value
app.use(express.static('public'));

// Third party middlewares
app.use(helmet());
app.use(morgan('tiny'));

const port = process.env.PORT || 3000;
const courses = [{
    id: 1,
    name: "Math"
}, {
    id: 2,
    name: "Physics"
}, {
    id: 3,
    name: "Chemistry"
}, ];

app.get('/api/courses', (req, res) => {
    res.send(courses);
});

app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send("The course with given id was not found");
    res.send(course);
});

app.post('/api/courses', (req, res) => {
    const { error } = validateCourse(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});

app.put('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send("The course with given id was not found");

    const { error } = validateCourse(req.body);
    if (error) return res.status(400).send(error.details[0].message);


    course.name = req.body.name;
    res.send(course);
});

app.delete('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send("The course with given id was not found");

    const index = courses.indexOf(course);
    courses.splice(index, 1);

    res.send(course);
});

function validateCourse(course) {
    const schema = {
        name: Joi.string().min(3).required()
    };
    return Joi.validate(course, schema);
}

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))