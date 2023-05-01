const Post = require('../models/Post');

const errorWrapper = require('../middlewares/errorWrapper');
const uploadFiles = require('../functions/uploadFile');
const getCurrentDate = require('../utils/date');

module.exports.createPost = errorWrapper(async (req, res) => {
    console.log(req.files);
});