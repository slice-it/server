/**
 * MAIN ROUTER of the application. 
 * Reroutes to subrouters appropriately
 */
const express = require('express');
const publicRouter = require('./public-router');
const authRouter = require('./auth-router');
const gameRouter = require('./game-router');

const app = express();
app.use('/', publicRouter);
app.use('/authenticate', authRouter);
app.use('/games', gameRouter);

module.exports = app;