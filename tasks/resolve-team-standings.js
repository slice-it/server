/**
 * Calls the standings ingestion engine to update the team standings
 * each week. 
 * Each team in the DB has following fields:
 *  -> key
 *  -> wins
 *  -> losses
 *  -> draws
 * Each team pulled from the ingestion engine has corresponding fields:
 *  -> Team
 *  -> Wins
 *  -> Losses
 *  -> Ties
 */
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '/../.env') });
const mongoose = require('mongoose');
const teamController = require('../controllers/team-controller');

const resolveStandings = async (week) => {
    try {
        
    } catch (err) {
        console.log(`Error has occured ${err}`);
    }
};

module.exports = {
    resolveStandings,
}
