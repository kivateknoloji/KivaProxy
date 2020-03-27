export function getType (value) {
  return Object.prototype.toString.call(value).replace(/^\[object |]$/gi, '')
}
