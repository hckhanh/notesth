const Ably = require('ably')

const ably = new Ably.Rest({
  key: process.env.ABLY_API_KEY
})

module.exports = ably
