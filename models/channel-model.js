const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Channel = new Schema(
    {
        id: { type: String, required: true},
        type: { type: String, required: true},
        recipients: { type: Array, required: true},
        messages: { type: Array, required: true}
    },
    { timestamps: true }
)

module.exports = mongoose.model('channels', Channel)