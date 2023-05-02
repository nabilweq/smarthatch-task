const Post = require('../models/Post');

const errorWrapper = require('../middlewares/errorWrapper');
const uploadFiles = require('../functions/uploadFile');
const deleteFiles = require('../functions/deleteFile');
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

module.exports.editPost = errorWrapper(async (req, res) => {
    const post = await Post.findById(req.params.postId);
    if(!post) {
        return res.status(400).json({
            success: false,
            message: "Post not found with id: " + req.params.postId,
            data: null
        })
    }

    const imageFiles = [];
    const newImageFiles = [];

    post.featured_images.concat(post.gallery_images).map(imageFile => {
        imageFiles.push(imageFile.split('/')[3]);
    });
    req.files.featured_images.concat(req.files.gallery_images).map(imageFile => {
        newImageFiles.push(imageFile.originalname);
    });

    const oldImages = imageFiles.filter(x => !newImageFiles.includes(x));

    if (oldImages.length > 0) {
        await deleteFiles(oldImages);        
    }

    post.title = req.body.title;
    post.description = req.body.description;
    post.createdOn = await getCurrentDate();
    post.search_tags = req.body.search_tags.split(',');
    post.publish = req.body.publish;
    post.featured_images = await uploadFiles(req.files.featured_images);
    post.gallery_images = await uploadFiles(req.files.gallery_images);

    await post.save();

    res.status(200).json({
        success: true,
        message: "Post updated successfully",
        data: post
    })
});

module.exports.deletePost = errorWrapper(async (req, res) => {
    const post = await Post.findByIdAndDelete(req.params.postId);
    if(!post) {
        return res.status(400).json({
            success: false,
            message: "Post not found with id: " + req.params.postId,
            data: null
        });
    }
    res.status(200).json({
        success: true,
        message: "Post deleted successfully",
        data: {
            name: post.title,
        }
    })
});