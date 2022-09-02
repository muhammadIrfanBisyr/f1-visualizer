import { createContext } from 'react'

export const DRIVER_INFO_INIT_VALUE = {
  year: '2022',
  actions: {}
}

const DriverInfoContext = createContext(DRIVER_INFO_INIT_VALUE)
export default DriverInfoContext
