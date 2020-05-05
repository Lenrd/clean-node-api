const MissingParamError = require('./missingParamError')
module.exports = class httpResponse {
  static badRequest (paramName) {
    return {
      statusCode: 400,
      body: new MissingParamError(paramName)
    }
  }
  static serverError () {
    return { statusCode: 500 }
  }
}
