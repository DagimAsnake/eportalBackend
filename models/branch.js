const mongoose = require('mongoose')
const { model, Schema } = mongoose

const branchSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    location: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: "None"
    }
}, { timestamps: true });

const Branch = model("Branch", branchSchema)

module.exports = Branch