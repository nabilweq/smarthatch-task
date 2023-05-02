const Post = require('../models/Post');

const errorWrapper = require('../middlewares/errorWrapper');
const uploadFiles = require('../functions/uploadFile');
const getCurrentDate = require('../utils/date');

module.exports.createPost = errorWrapper(async (req, res) => {
    const newPost = new Post({
        title: req.body.title,
        description: req.body.description,
        createdOn: await getCurrentDate(),
        search_tags: req.body.search_tags.split(','),
        publish: req.body.publish,
        featured_images: await uploadFiles(req.files.featured_images),
        gallery_images: await uploadFiles(req.files.gallery_images)
    });

    await newPost.save();

    res.status(200).json({
        success: true,
        message: "Post created successfully",
        data: newPost
    })
});

module.exports.getAllPosts = errorWrapper(async (req, res) => {
    res.status(200).json({
        success: true,
        message: "Posts fetched successfully",
        data: await Post.find()
    })
});