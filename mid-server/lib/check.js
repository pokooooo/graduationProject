const Exception = require('./exception')

class Error {
  constructor(stat) {
    this.stat = stat || 'Internel_Server_Error'
    this.msg = Exception.get(stat)
  }
}

function check(bool, stat ,msg) {
  if (!bool) {
    let error = new Error(stat)
    error.msg = msg
    throw error
  }
}

function catchError(err, ctx) {
  console.trace(err)
  ctx.body = { ...err }
}

function generateOk(data) {
  return {
    stat: 'ok',
    data,
  }
}

module.exports = {
  check,
  catchError,
  generateOk,
}
