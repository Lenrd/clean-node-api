const httpResponse = require('../helpers/http-response')
const MissingParamError = require('../helpers/missingParamError')
module.exports = class LoginRouter {
  constructor (authUseCase) {
    this.authUseCase = authUseCase
  }
  route (httpRequest) {
    if (
      !httpRequest ||
      !httpRequest.body ||
      !this.authUseCase ||
      !this.authUseCase.auth
    ) {
      return httpResponse.serverError()
    }
    const { email, password } = httpRequest.body
    if (!email) {
      return httpResponse.badRequest(new MissingParamError('email'))
    }

    if (!password) {
      return httpResponse.badRequest(new MissingParamError('password'))
    }

    const accessToken = this.authUseCase.auth(email, password)
    if (!accessToken) {
      return httpResponse.unauthorizedError()
    }
    return httpResponse.success()
  }
}
