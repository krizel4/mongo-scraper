// dependencies
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:3000/scrape');
mongoose.connection.on('error', () => {
    console.error('MongoDB Connection Error. Make sure MongoDB is running.');
});

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

module.exports = mongoose.model('Headline', headlineSchema);