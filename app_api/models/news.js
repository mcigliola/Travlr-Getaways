const mongoose = require('mongoose');

// Define the news schema
const newsSchema = new mongoose.Schema({
    type: { type: String, required: true},
    code: { type: String, required: true, index: true },
    title: { type: String, required: true, index: true },
    date: { type: String, required: false },
    author: { type: String, required: false },
    image: { type: String, required: false },
    link: { type: String, required: false},
    content: { type: String, required: false }
});
const News = mongoose.model('news', newsSchema);
module.exports = News;