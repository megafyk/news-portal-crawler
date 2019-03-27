const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PostSchema = new Schema({
    source: String,
    title: String,
    imageUrl: String,
    description: String,
    pubDate: Date,
    category: String,
    copyright: String,
});

var Post = mongoose.model("Post", PostSchema);
module.exports = Post;