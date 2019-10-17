/**
 * Calls the program in ../ingestion/score-write-partition.js.
 * Options on how to match score with a game:
 * 1. Obtain home and away teams (awayTeam.key and homeTeam.key) 
 *  -> match with data.data.events[i].teams_normalized[0].abbreviation (away)
 *      and data.data.events[i].teams_normalized[1].abbreviation (home)
 */
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '/../.env') });
const mongoose = require('mongoose');
const scores = require('../ingestion/score-write-partition');
const gameController = require('../controllers/game-controller');

const writeScores = async (date, dbName, year, week) => {
    // create DB string
    const dbConnection = `${process.env.DB_CONN_STR1}${process.env.DATABASE_ROOT_USERNAME}${process.env.DB_CONN_STR2}${process.env.DATABASE_ROOT_PASSWORD}${process.env.DB_CONN_STR3}${dbName}${process.env.DB_CONN_STR4}`;
    try {
        const gameScores = await scores.runEngine(date);
        /**
          * 1. Build slug from params and gameScores info
          * 2. Find the corresponding game in the DB based of slug
          * 3. Rewrite scores
          * 4. Save to DB.
          */
        await mongoose.connect(dbConnection);
        mongoose.Promise = global.Promise;
    } catch (err) {
        console.log(`Error has occured ${err}`);
    }
};

module.exports = {
    writeScores,
};