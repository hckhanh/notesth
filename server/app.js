const express = require('express')
const path = require('path')
const logger = require('morgan')
const createError = require('http-errors')
const auth = require('./api/auth')
const { apiLimiter, indexLimiter } = require('./limits')

const app = express()
const buildFolderPath = path.resolve('build')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(buildFolderPath))

app.use('/auth', apiLimiter, auth)

app.all('*', indexLimiter, function(req, res) {
  res.sendFile(path.join(buildFolderPath, 'index.html'))
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404))
})

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.send(res.locals)
})

module.exports = app
