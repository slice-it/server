const router = require('express').Router();
const passport = require('passport');
const moment = require('moment'); // comment-router subs.
const { catchErrors } = require('../handlers/error-handlers');
const betController = require('../controllers/bet-controller');
const commentController = require('../controllers/comment-controller'); // comment-router subs.
const CustomError = require('../handlers/Custom-Error');
const timeVerify = require('../handlers/bet-time-verification');

/**
 * AS OF 9/4/19: this route does the creates the comment 
 * Router that places bets, syncs to bet controller 'createOne()'
 * req.params.slug -> slug of the gamethread
 * req.body.slices -> number of slices to be betted 
 * req.body.teamId -> id of team bet on
 * req.body.key -> team key that the user is betting on
 * req.body.gamethreadId -> id of gamethread
 * req.body.comment -> comment associated with the bet
 * req.body.dateTime -> timestamp from front
 * req.user -> the user
 */
router.post('/gamethread/:slug',
    passport.authenticate('jwt', { session: false }),
    catchErrors(async(req, res) => {
        if(req.body.slices && req.body.key) {
            // dateTime must be greater than current time
            const validTime = await timeVerify.isValidTime(req.body.dateTime);
            if(!validTime) {
                const timeExpired = 'Betting disabled, game either started, in progress or finished';
                return res.status(400).json({
                    timeExpired,
                });
            }
            // create the bet first
            const bet = await betController.createOne({
                owner: req.user._id,
                gameThreadReference: req.body.gamethreadId,
                teamReference: req.body.teamId,
                key: req.body.key,
                slug: req.params.slug,
                slicesBet: req.body.slices,
                isWin: false,
            });
            if(bet.serverMessage.includes('Error')) {
                serverMessage = bet.serverMessage;
                return res.status(400).json({
                    serverMessage,
                });
            }
            // create the comment afterwards
              // const comment = await commentController.createOne({
              //     owner: req.user.username,
              //     ownerObj: req.user._id,
              //     gravatar: req.user.gravatar,
              //     text: req.body.comment,
              //     createdAt: `${moment()}`,
              //     isRootComment: true,
              //     replies: [],
              //     slicesBet: req.body.slices,
              //     gameThreadReference: req.body.gamethreadId,
              //     slug: req.params.slug,
              //     betReference: bet._id, // point to bet reference
              // });
            // then update bet to point to comment reference
            // await betController.updateOne(bet._id, {
            //     commentReference: comment._id,
            // });
            if(bet) {
                return res.status(201).json({
                    bet, 
                    // comment,
                });
            } else {
                const errorBet = new CustomError(400, 'Bet wasnt created.');
                return res.status(400).json({ errorBet });
            }
        } else {
            const errorReq = new CustomError(400, `'slices' and 'key' are required in req.body`);
            return res.status(400).json({ errorReq });
        }
    })
);

module.exports = router;