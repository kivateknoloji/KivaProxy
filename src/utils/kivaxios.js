import axios from 'axios'

import { BRIDGE_URL } from '../constants'

const kivaxios = axios.create({
  withCredentials: true,
  baseURL: `${BRIDGE_URL}/data`,
  headers: {},
})

const kivaxiosCustom = axios.create({
  withCredentials: true,
  baseURL: `${BRIDGE_URL}/custom`,
  headers: {},
})

export {
  kivaxios,
  kivaxiosCustom
}
