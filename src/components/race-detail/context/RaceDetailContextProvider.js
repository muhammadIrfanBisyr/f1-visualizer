import React, { useReducer } from 'react'
import RaceDetailContext, { CONTEXT_INITIAL_STATE } from './RaceDetailContext'
import { SESSION, SPRINT_RACE_CONST } from '../../global/constant/Session'

const ACTION = {
  SET_TRACK: 'SET_TRACK',
  SET_TRACK_ID: 'SET_TRACK_ID',
  SET_YEAR: 'SET_YEAR',
  SET_SESSION: 'SET_SESSION',
  SET_CHART_TYPE: 'SET_CHART_TYPE',
  SET_LOADING: 'SET_LOADING',
  SET_RESULT_DATA: 'SET_RESULT_DATA',
  SET_LAP_DATA: 'SET_LAP_DATA'
}

function reducer (state, { type, payload }) {
  switch (type) {
    case ACTION.SET_YEAR:
      return { ...state, year: payload.year, track: '1', session: payload.session }
    case ACTION.SET_TRACK:
      return { ...state, track: payload }
    case ACTION.SET_TRACK_ID:
      return { ...state, trackId: payload.trackId, session: payload.session }
    case ACTION.SET_SESSION:
      return { ...state, session: payload.session, chartType: payload.chartType, resultData: payload.resultData }
    case ACTION.SET_CHART_TYPE:
      return { ...state, chartType: payload }
    case ACTION.SET_LOADING:
      return { ...state, loading: payload }
    case ACTION.SET_RESULT_DATA:
      return { ...state, resultData: payload }
    case ACTION.SET_LAP_DATA:
      return { ...state, lapsData: payload }
    default:
      return state
  }
}

const getCheckSession = (session, year, trackId) => {
  return session === SESSION.SPRINT.value && SPRINT_RACE_CONST.has(`${year}_${trackId}`) ? session : SESSION.RACE.value
}

export default function RaceDetailContextProvider ({ initValue, children }) {
  const _initValue = {
    ...CONTEXT_INITIAL_STATE,
    year: initValue?.year ?? CONTEXT_INITIAL_STATE.year,
    track: initValue?.round ?? CONTEXT_INITIAL_STATE.track
  }

  const [state, dispatch] = useReducer(reducer, _initValue)

  const setTrack = (data) => {
    dispatch({ type: ACTION.SET_TRACK, payload: data })
  }

  const setTrackId = (data) => {
    const session = getCheckSession(state.session, state.year, data)
    dispatch({ type: ACTION.SET_TRACK_ID, payload: { trackId: data, session } })
  }

  const setYear = (data) => {
    const session = getCheckSession(state.session, data, state.trackId)
    dispatch({ type: ACTION.SET_YEAR, payload: { year: data, session } })
  }

  const setSession = (data) => {
    const chartType = data !== SESSION.RACE.value ? 'T' : state.chartType
    dispatch({ type: ACTION.SET_SESSION, payload: { session: data, chartType, resultData: [] } })
  }

  const setChartType = (data) => {
    dispatch({ type: ACTION.SET_CHART_TYPE, payload: data })
  }

  const setLoading = (data) => {
    dispatch({ type: ACTION.SET_LOADING, payload: data })
  }

  const setResultData = (data) => {
    dispatch({ type: ACTION.SET_RESULT_DATA, payload: data })
  }

  const setLapData = (data) => {
    dispatch({ type: ACTION.SET_LAP_DATA, payload: data })
  }

  return (
        <RaceDetailContext.Provider
            value={{
              ...state,
              actions: {
                setTrack,
                setTrackId,
                setYear,
                setSession,
                setChartType,
                setLoading,
                setResultData,
                setLapData
              }
            }}>
            {children}
        </RaceDetailContext.Provider>
  )
}
