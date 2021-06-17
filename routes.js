const express = require('express')
const router = express.Router()

const service = require('./service')

router.get('/post', service.getPost)
router.get('/posts', service.getPosts)
router.post('/post', service.addPost)
router.put('/post/:id', service.updatePost)
router.delete('/post/:id', service.deletePost)

module.exports = router
