/** Comment Model */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
const mongodbErrorHandler = require('mongoose-mongodb-errors');

const commentSchema = new Schema({
    owner: String,
    ownerObj: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
    gravatar: String,
    text: String,
    createdAt: String,
    isRootComment: Boolean, // only allow nested comments if this is true.
    replies: [
        {
            username: String,
            gravatar: String,
            text: String,
            createdAt: String,
        }
    ],
    slicesBet: {
        type: Number,
        default: 0,
    },
    gameThreadReference: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'gamethread',
    },
    slug: String,
    betReference: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'bet',
    },
    votes: {
        up: [{ 
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
        }],
        down: [{ 
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
        }],
    }
});

commentSchema.plugin(mongodbErrorHandler);

const Comment = mongoose.model('comment', commentSchema);

module.exports = Comment;
