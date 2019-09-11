const RateLimit = require('express-rate-limit')

module.exports.apiLimiter = new RateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 30
})

module.exports.indexLimiter = new RateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 50
})
