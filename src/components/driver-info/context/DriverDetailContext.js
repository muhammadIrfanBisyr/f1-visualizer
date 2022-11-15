import { createContext } from 'react'

export const INITITAL_VALUE = {
  loading: false,
  driverId: '',
  profileData: {},
  summaryData: {},
  detailData: {},
  actions: {}
}

const DriverDetailContext = createContext(INITITAL_VALUE)

export default DriverDetailContext
