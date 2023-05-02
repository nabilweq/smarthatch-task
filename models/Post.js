const mongoose = require('mongoose');

const Post = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    createdOn: {
        type: Date,
        required: true
    },
    search_tags: [{
        type: String,
    }],
    publish: {
        type: Boolean,
        default: false
    },
    featured_images: [{
        type: String,
    }],
    gallery_images: [{
        type: String,
    }],
})

module.exports = mongoose.model('post', Post);