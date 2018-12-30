const express = require('express')
const router = express.Router()
const ably = require('../services/ably')
const pusher = require('../services/pusher')

router.get('/ably', function(req, res, next) {
  ably.auth.createTokenRequest(function(err, tokenRequest) {
    if (err) {
      next(err)
    } else {
      res.send(tokenRequest)
    }
  })
})

router.post('/pusher', function(req, res) {
  const socketId = req.body.socket_id
  const channel = req.body.channel_name
  const auth = pusher.authenticate(socketId, channel)
  res.send(auth)
})

module.exports = router
