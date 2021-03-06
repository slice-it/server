const teamPartition = require('./team-partition');
const gamePartition = require('./game-partition');
const threadPartition = require('./gamethread-partition');

if(process.argv.includes('--team')) {
    console.log('Running Ingestion Engine for Teams');
    teamPartition.runEngine();
} else if(process.argv.includes('--thread')) {
    console.log('Running Ingestion Engine for GameThreads');
    threadPartition.runEngine();
} else if(process.argv.includes('--game')) {
    console.log('Running Ingestion Engine for Games');
    gamePartition.runEngine();
} else {
    console.log('Ingestion Engine Activated');
}