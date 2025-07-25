const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const healthArticleSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    content: String,
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

module.exports = mongoose.model('HealthArticle', healthArticleSchema);
