import { createContext } from 'react'

export const SEASON_SUMMARY_INIT_VALUE = {
  year: '2022',
  dataMode: 'D',
  chartType: 'T',
  dataResults: [],
  actions: {}
}

const SeasonSummaryContext = createContext(SEASON_SUMMARY_INIT_VALUE)

export default SeasonSummaryContext
