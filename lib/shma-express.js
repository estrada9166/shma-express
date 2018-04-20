'use strict'

class Shma {
  constructor () {
    this.string = 'string'
    this.number = 'number'
    this.array = 'array'
    this.object = 'object'
    this.boolean = 'boolean'
  }

  schema (obj) {
    return function cb (req, res, next) {
      const body = req.body || {}
      const params = req.params || {}
      const query = req.query || {}
      const data = Object.assign({}, body, params, query)

      let error = false
      let message

      for (const key in obj) {
        if (!data[key]) {
          error = true
          message = `${key} is missing`
          break
        }

        if (obj[key] !== 'array' && Array.isArray(data[key])) {
          error = true
          message = `${key} must by type of ${obj[key]}`
          break
        }

        if (obj[key] === 'array' && !Array.isArray(data[key])) {
          error = true
          message = `${key} must by type of Array`
          break
        }

        if (!(typeof data[key] === obj[key]) && obj[key] !== 'array') {
          error = true
          message = `${key} must by type of ${obj[key]}`
          break
        }
      }
      if (error) {
        return res.status(400).send(message)
      }
      next()
    }
  }
}

module.exports = Shma
