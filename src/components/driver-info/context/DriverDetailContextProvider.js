import React, { useReducer } from 'react'
import DriverDetailContext, { INITITAL_VALUE } from './DriverDetailContext'

const ACTION = {
  SET_LOADING: 'SET_LOADING',
  SET_PROFILE_DATA: 'SET_PROFILE_DATA',
  SET_SUMMARY_DATA: 'SET_SUMMARY_DATA',
  SET_DETAIL_DATA: 'SET_DETAIL_DATA'
}

function reducer (state, { type, payload }) {
  switch (type) {
    case ACTION.SET_LOADING:
      return { ...state, loading: payload }
    case ACTION.SET_SUMMARY_DATA:
      return { ...state, summaryData: payload }
    case ACTION.SET_PROFILE_DATA:
      return { ...state, profileData: payload }
    case ACTION.SET_DETAIL_DATA:
      return { ...state, detailData: payload }
    default:
      return state
  }
}

export default function DriverDetailContextProvider ({ initValue, children }) {
  const _initValue = { ...INITITAL_VALUE, driverId: initValue?.driverId }
  const [state, dispatch] = useReducer(reducer, _initValue)

  const setLoading = (data) => {
    dispatch({ type: ACTION.SET_LOADING, payload: data })
  }

  const setSummaryData = (data) => {
    dispatch({ type: ACTION.SET_SUMMARY_DATA, payload: data })
  }

  const setProfileData = (data) => {
    dispatch({ type: ACTION.SET_PROFILE_DATA, payload: data })
  }

  const setDetailData = (data) => {
    dispatch({ type: ACTION.SET_DETAIL_DATA, payload: data })
  }

  return (
    <DriverDetailContext.Provider
      value={{ ...state, actions: { setSummaryData, setProfileData, setLoading, setDetailData } }}
    >
      { children }
    </DriverDetailContext.Provider>
  )
}
