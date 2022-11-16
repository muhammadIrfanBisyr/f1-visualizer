import { createContext } from 'react'

export const INITIAL_VALUE = {
  chartType: 'L',
  dataType: 'P',
  actions: {}
}

const DriverChartContext = createContext(INITIAL_VALUE)
export default DriverChartContext
