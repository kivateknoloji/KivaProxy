import { getType } from './getType'
import { IDS_LIMIT } from '../constants'

const allowedTypes = ['Array', 'String', 'Number']

export function validateAndParseIds (ids) {
  const type = getType(ids)
  if (allowedTypes.includes(type)) {
    if (type === 'Array') {
      if (ids.length > IDS_LIMIT) {
        throw new Error(`You can give maximum ${IDS_LIMIT} id at one request`)
      } else {
        return ids.join(',')
      }
    } else {
      return ids
    }
  } else {
    throw new Error(`${type} is not supported argument`)
  }
}
