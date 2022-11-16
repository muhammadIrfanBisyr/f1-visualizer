import { createContext } from 'react'

export const DRIVER_INFO_INIT_VALUE = {
  year: '2022',
  loading: false,
  actions: {}
}

const DriverListContext = createContext(DRIVER_INFO_INIT_VALUE)
export default DriverListContext
