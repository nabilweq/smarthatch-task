const router = require('express').Router();
const multer = require('multer');

const upload = multer()

const { createPost, getAllPosts, editPost, deletePost } = require('../controllers/post')

router.post('/', upload.fields([
    {
        name:'featured_images',
    },
    {
        name: 'gallery_images',
    }
]), createPost);

router.get('/', getAllPosts);

router.put('/:postId', upload.fields([
    {
        name:'featured_images',
    },
    {
        name: 'gallery_images',
    }
]), editPost);

router.delete('/:postId', deletePost);

module.exports = router;