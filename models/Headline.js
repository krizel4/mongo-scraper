// dependencies
const mongoose = require('mongoose');

// schema
const Schema = mongoose.Schema;

const headlineSchema = new Schema({
    // unique headline
    title: {
        type: String,
        required: true,
     },
    link: {
        type: String,
        required: true
    },
    summary: {
        type: String,
        required: true
    },
    saved: {
        type: Boolean,
        default: false
    },
    note: {
        type: Schema.Types.ObjectId,
        ref: 'Note'
    }
});

const Headline = mongoose.model('headline', headlineSchema);

module.exports = Headline;