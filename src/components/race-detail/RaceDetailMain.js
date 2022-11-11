import React, { useContext, useEffect } from 'react'
import { message } from 'antd'

import RaceDetailLayout from './RaceDetailLayout'
import RaceDetailContext from './context/RaceDetailContext'
import { apiDataToTableData } from './helper/RaceDetailAPI'

import useFetchAPI from '../../hooks/useFetchAPI'

const API_ENDPOINT = {
  Q: 'qualifying',
  S: 'sprint',
  R: 'results'
}

export default function RaceDetailMain () {
  const { year, session, track, actions: { setResultData, setLoading } } = useContext(RaceDetailContext)
  const url = `https://ergast.com/api/f1/${year}/${track}/${API_ENDPOINT[session]}.json`

  const fetcher = useFetchAPI()
  const fetchData = async () => {
    try {
      setLoading(true)
      const result = await fetcher({ url })
      setResultData(apiDataToTableData(result, session))
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
