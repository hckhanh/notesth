const Pusher = require('pusher')

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_API_KEY,
  secret: process.env.PUSHER_SECRET_KEY,
  cluster: process.env.PUSHER_APP_CLUSTER
})

module.exports = pusher
