import React, { useContext, useEffect } from 'react'
import { message } from 'antd'

import RaceDetailLayout from './RaceDetailLayout'
import RaceDetailContext from './context/RaceDetailContext'

import useFetchAPI from '../../hooks/useFetchAPI'

const API_ENDPOINT = {
  Q: 'qualifying',
  S: 'sprint',
  R: 'results'
}

export default function RaceDetailMain () {
  const { year, session, track, actions: { setResultData, setLapData, setLoading } } = useContext(RaceDetailContext)

  const resultUrl = `https://ergast.com/api/f1/${year}/${track}/${API_ENDPOINT[session]}.json`
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
