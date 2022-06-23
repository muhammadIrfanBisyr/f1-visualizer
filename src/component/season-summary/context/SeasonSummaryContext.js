import { createContext } from 'react'

export const SEASON_SUMMARY_INIT_VALUE = {
  year: '2022'
}

const SeasonSummaryContext = createContext(SEASON_SUMMARY_INIT_VALUE)

export default SeasonSummaryContext
