import { version } from '../package.json'
import { kivaxios, kivaxiosCustom } from './utils/kivaxios'
import { validateAndParseIds } from './utils/validateAndParseIds'
import { validateAndTransformRecords } from './utils/validateAndTransformRecords'
import { getType } from './utils/getType'

export default class KivaProxy {
  constructor ({ endpoint, parameters = {}, config = {} }) {
    this.endpoint = endpoint
    this.parameters = parameters
    this.$httpDrivers = this.__proto__.$http
    this.httpDriver = 'default'
  }

  all () {
    return this.submit('get', `/${this.endpoint}`)
  }

  find (ids) {
    const suffix = validateAndParseIds(ids)
    return this.submit('get', `/${this.endpoint}/${suffix}`)
  }

  create (records, config = {}) {
    return this.submit('post', `/${this.endpoint}`, { ...config, records: validateAndTransformRecords(records) })
  }

  update (records, config = {}) {
    return this.submit('patch', `/${this.endpoint}`, { ...config, records: validateAndTransformRecords(records) })
  }

  destroy (ids) {
    const suffix = validateAndParseIds(ids)
    return this.submit('delete', `/${this.endpoint}/${suffix}`)
  }

  submit (requestType, url, data = null) {
    const driver = this.getDriver()
    return new Promise((resolve, reject) => {
      driver[requestType](url + this.getParameterString(), data)
        .then(({ data }) => {
          resolve(data)
        })
        .catch(({ response }) => {
          if (response) {
            reject(response.data)
          } else {
            reject(response)
          }
        })
    })
  }

  setViewId (id) {
    this.setParameter('viewId', id)
    return this
  }

  getEmpty (boolean) {
    this.setParameter('getEmpty', !!boolean)
    return this
  }

  setFields (array) {
    this.setParameter('fields', array)
    return this
  }

  setFilters (array) {
    this.setParameter('filters', array)
    return this
  }

  setKeyword (string) {
    this.setParameter('keyword', string)
    return this
  }

  setStart (integer) {
    this.setParameter('start', integer)
    return this
  }

  setLimit (integer) {
    this.setParameter('limit', integer)
    return this
  }

  setSort (string) {
    this.setParameter('sort', string)
    return this
  }

  setDir (string) {
    this.setParameter('dir', string)
    return this
  }

  getDriver () {
    if (this.$httpDrivers.hasOwnProperty(this.httpDriver)) {
      return this.$httpDrivers[this.httpDriver]
    } else {
      throw new Error('http driver not found')
    }
  }

  setHeaders (parameters) {
    this.config.headers = { ...this.config.headers, ...parameters }
    return this
  }

  setParameters (parameters) {
    Object.keys(parameters).forEach((key) => {
      this.parameters[key] = parameters[key]
    })

    return this
  }

  setParameter (parameter, value) {
    this.parameters[parameter] = value
    return this
  }

  removeParameters (parameters) {
    parameters.forEach((parameter) => {
      delete this.parameters[parameter]
    })

    return this
  }

  removeParameter (parameter) {
    delete this.parameters[parameter]

    return this
  }

  clearParameters () {
    this.parameters = {}
  }

  getParameterString () {
    const keys = Object.keys(this.parameters)
    const stringifyRequiredTypes = ['Array', 'Object']

    const parameterStrings = keys
      .map(key => {
        let value = this.parameters[key]
        if (stringifyRequiredTypes.includes(getType(value))) {
          value = JSON.stringify(value)
        }
        return `${key}=${value}`
      })

    return parameterStrings.length === 0 ? '' : `?${parameterStrings.join('&')}`
  }
}
KivaProxy.$global = KivaProxy.prototype
KivaProxy.prototype.config = {}
KivaProxy.prototype.$http = {
  default: kivaxios,
  custom: kivaxiosCustom
}
KivaProxy.prototype.version = version
