const Joi = require("joi");
const express = require("express");
const app = express();

app.use(express.json());

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
    if (!course) res.status(404).send("The course with given id was not found");
    res.send(course);
});

app.post('/api/courses', (req, res) => {
    const { error } = validateCourse(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }
    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});

app.put('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) res.status(404).send("The course with given id was not found");

    const { error } = validateCourse(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    course.name = req.body.name;
    res.send(course);
});

function validateCourse(course) {
    const schema = {
        name: Joi.string().min(3).required()
    };
    return Joi.validate(course, schema);
}

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))