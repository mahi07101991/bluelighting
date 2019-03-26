const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
    // TODO: Build User Schema here...
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        required: true
    },
    Date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User', UserSchema);