const router = require('express').Router();
const multer = require('multer');

const upload = multer()

const { createPost, getAllPosts } = require('../controllers/post')

router.post('/', upload.fields([
    {
        name:'featured_images',
    },
    {
        name: 'gallery_images',
    }
]), createPost);
router.get('/', getAllPosts);

module.exports = router;