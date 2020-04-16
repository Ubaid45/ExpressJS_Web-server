# Building RESTful APIs with Express

- **REST** defines a set of conventions for creating HTTP services:
  - **POST**: to create a resource.
  - **PUT**: to update it.
  - **GET**: to read it.
  - **DELETE**: to delete it.
- **Express** is a simple, minimalistic and lightweight framework for building web servers.

## Build a web server

```javascript
const express = require(‘express’);
const app = express();
```

## Creating a course

```javascript
app.post("/api/courses", (req, res) => { 
        // Create the course and return the course object     
        res.send(course); });
});
```

## Getting all the courses

```javascript
app.get("/api/courses", (req, res) => {
    // To read query string parameters (?sortBy=name)      
    const sortBy = req.query.sortBy;
    // Return the courses
    res.send(courses);
});
``` 
## Getting a single course 

```javascript
app.get("/api/courses/:id", (req, res) => {
    const courseId = req.params.id;
    // Lookup the course     
    // If not found, return 404      
    res.status(404).send("Course not found.");
    // Else, return the course object
    res.send(course);
});
```
## Updating a course
```javascript
app.put("/api/courses/:id", (req, res) => {
    // If course not found, return 404, otherwise update it
    // and return the updated object.
});
```
##  Deleting a course
```javascript
app.delete("/api/courses/:id", (req, res) => {
    // If course not found, return 404, otherwise delete it
    // and return the deleted object.  
});
```
## Listen on port 3000
```javascript
app.listen(3000, () => console.log(‘Listening...’));
```
- We use **Nodemon** to watch for changes in files and automatically restart the node process.
- We can use environment variables to store various settings for an application. To read an environment variable, we use **process.env**. 
## Reading the port from an environment variable 
```javascript
const port = process.env.PORT || 3000;
app.listen(port);
```
## Data validation
- We should never trust data sent by the client and validate always. 
- We can use **[Joi package](https://www.npmjs.com/package/joi)** to perform input validation. 
