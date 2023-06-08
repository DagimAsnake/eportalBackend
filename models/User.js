const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const userSchema = new mongoose.Schema({
    vrn: {
        type: String,
        required: true
    },
    taxCenter: {
        type: String,
        required: true
    },
    tname: {
        type: String,
        required: true
    },
    tin: {
        type: String,
        required: true
    },
    userType: {
        type: String,
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    username: {
        type: String
    },
    password: {
        type: String
    },
    UUID: {
        type: String,
        default: uuidv4
    }
});

module.exports = mongoose.model('User', userSchema);