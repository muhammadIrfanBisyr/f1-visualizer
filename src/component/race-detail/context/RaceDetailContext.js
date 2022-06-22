import { createContext } from 'react'

export const CONTEXT_INITIAL_STATE = {
  year: '2022',
  track: '1',
  trackId: '',
  session: 'R',
  chartType: 'T',
  loading: false,
  resultData: [],
  actions: {}
}

const RaceDetailContext = createContext(CONTEXT_INITIAL_STATE)

export default RaceDetailContext
