const express = require('express');
const app = express();
const errorHandler = require('./utils/error');
const userRoutes = require('./routes/userRoutes');
const airportRoutes = require('./routes/airportRoutes');
const aircraftRoutes = require('./routes/aircraftRoutes');

app.use(express.json());

app.use('/v1/user', userRoutes);
app.use('/v1/airport', airportRoutes);
app.use('/v1/aircraft', aircraftRoutes);


app.all('*', (req, res) => {
  res.status(404).send(`Can't find ${req.originalUrl} on this server!`);
});


app.use(errorHandler);

module.exports = app;