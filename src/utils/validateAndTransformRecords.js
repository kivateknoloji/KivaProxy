import { getType } from './getType'

const allowedTypes = ['Array', 'Object']

export function validateAndTransformRecords (records) {
  const type = getType(records)
  if (allowedTypes.includes(type)) {
    if (type === 'Object') {
      return [records]
    } else {
      return records
    }
  } else {
    throw new Error(`${type} is not supported argument`)
  }
}
