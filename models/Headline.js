// dependencies
const mongoose = require('mongoose');

// schema
const Schema = mongoose.Schema;

const headlineSchema = new Schema({
    // unique headline
    headline: {
        type: String,
        required: true,
        unique: true
    },
    summary: {
        type: String,
        required: true
    },
    date: String,
    saved: {
        type: Boolean,
        default: false
    }
});

const Headline = mongoose.model('headline', headlineSchema);

module.exports = Headline;