import { createContext } from 'react'
import { SESSION } from '../../global/constant/Session'

export const CONTEXT_INITIAL_STATE = {
  year: '2022',
  track: '1',
  trackId: '',
  session: SESSION.RACE.value,
  chartType: 'T',
  loading: false,
  resultData: [],
  lapsData: [],
  actions: {}
}

const RaceDetailContext = createContext(CONTEXT_INITIAL_STATE)

export default RaceDetailContext
