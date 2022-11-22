import React, { useContext, useEffect } from 'react'
import { message } from 'antd'

import useFetchAPI from '../../hooks/useFetchAPI'
import { SESSION, getSessionKeyFromValue } from '../global/constant/Session'

import RaceDetailLayout from './RaceDetailLayout'
import RaceDetailContext from './context/RaceDetailContext'

export default function RaceDetailMain () {
  const { year, session, track, actions: { setResultData, setLapData, setLoading } } = useContext(RaceDetailContext)

  const apiEndpoint = SESSION[getSessionKeyFromValue('value', session)].apiEndpoint
  const resultUrl = `https://ergast.com/api/f1/${year}/${track}/${apiEndpoint}.json`
  const lapsUrl = `https://ergast.com/api/f1/${year}/${track}/laps.json?limit=1500`

  const fetcher = useFetchAPI()
  const fetchData = async () => {
    try {
      setLoading(true)
      const [resultData, lapsData] = await fetcher({ urls: [resultUrl, lapsUrl] })
      setResultData(resultData)
      setLapData(lapsData)
    } catch (e) {
      message(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [year, session, track])

  return (<RaceDetailLayout/>)
}
