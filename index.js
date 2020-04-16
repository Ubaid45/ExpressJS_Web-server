const helmet = require("helmet");
const logger = require("./middleware/logger");
const express = require("express");
const app = express();
const courses = require("./routes/courses");
const home = require("./routes/home");
const genres = require('./routes/genres');

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

app.set('view engine', 'pug');
app.set('views', './views'); // default

//Built-in middlewares
app.use(express.json());

// Third party middlewares
app.use(helmet());
app.use(logger);

app.use('/api/courses', courses);
app.use('/', home);
app.use('/api/genres', genres);