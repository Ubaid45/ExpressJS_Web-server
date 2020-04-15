const express = require("express");
const app = express();
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

app.get('/', (req, res) => res.send('Hello World!'));

app.get('/api/courses', (req, res) => {
    res.send([1, 2, 3])
});

app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) res.status(404).send("The course with given id was not found");
    res.send(course);
});


app.get('/api/posts/:year/:month', (req, res) => {
    res.send(req.params);
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))