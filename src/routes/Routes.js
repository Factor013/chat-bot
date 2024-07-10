const express = require('express')
const ChatController = require('../controller/ChatController')

const router = express.Router()

router.post('/bot', ChatController.generateResponse);

module.exports = router