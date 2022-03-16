const express = require('express');


// Routers
const { actorsRouter } = require('./routes/actors.routes');
const { moviesRouter } = require('./routes/movies.routes');
const { reviewsRouter } = require('./routes/reviews.routes');
const { usersRouter } = require('./routes/users.routes');


const app = express();

app.use (express.json());

// Endpoints
app.use('/api/mov/actors', actorsRouter);
app.use('/api/mov/movies', moviesRouter);
app.use('/api/mov/reviews', reviewsRouter);
app.use('/api/mov/users', usersRouter);


module.exports = { app };