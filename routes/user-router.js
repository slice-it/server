const router = require('express').Router();
const passport = require('passport');
const { catchErrors } = require('../handlers/error-handlers');
const userController = require('../controllers/user-controller');

/**
 * Route that reads all bets from the P.O.V. of the user.
 * req.user -> the user 
 */
router.get('/bets',
    passport.authenticate('jwt', { session: false }),
    catchErrors(async(req, res) => {
        const bets = await userController.readAllBets(req.user._id);
        return res.status(201).json({
            bets,
        });
    })
);

/**
 * Route the reads the global leaderboard
 */
router.get('/leaderboard/global',
    catchErrors(async(req, res) => {
        // call the leaderboard function on user controller
    })
);

module.exports = router;