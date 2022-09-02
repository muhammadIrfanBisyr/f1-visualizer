import React, { useReducer } from 'react'
import TrackInfoContext, { TRACK_INFO_INITIAL_STATE } from './TrackInfoContext'

const ACTION = {
  SET_ALL_TRACK_INFO: 'SET_ALL_TRACK_INFO'

}

function reducer (state, { type, payload }) {
  switch (type) {
    case ACTION.SET_ALL_TRACK_INFO:
      return { ...state, ...payload }
    default:
      return state
  }
}

export default function TrackInfoContextProvider ({ children }) {
  const [state, dispatch] = useReducer(reducer, TRACK_INFO_INITIAL_STATE)

  const setTrackInfo = (data) => {
    dispatch({ type: ACTION.SET_ALL_TRACK_INFO, payload: data })
  }

  return (
    <TrackInfoContext.Provider
        value={{
          ...state,
          actions: {
            setTrackInfo
          }

        }}>
        {children}
    </TrackInfoContext.Provider>
  )
}
