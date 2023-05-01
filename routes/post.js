const router = require('express').Router();
const multer = require('multer');

const upload = multer()

const { createPost } = require('../controllers/post')

router.post('/', upload.fields([
    {
        name:'featured_images',
        maxCount:1
    },
    {
        name: 'gallery_images',
         maxCount:1
    }
]), createPost);

module.exports = router;