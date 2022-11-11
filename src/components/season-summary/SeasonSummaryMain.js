import React, { useState, useEffect, useContext } from 'react'

import { message } from 'antd'

import SeasonSummaryContext from './context/SeasonSummaryContext'
import SeasonSummaryLayout from './SeasonSummaryLayout'

import useFetchAPI from '../../hooks/useFetchAPI'
import { apiDataToTableData } from './helper/SeasonSummaryAPI'

export default function SeasonSummaryMain () {
  const { year, actions: { setDataResults } } = useContext(SeasonSummaryContext)
  const [loading, setLoading] = useState(false)
  const fetcher = useFetchAPI()

  const fetchData = async () => {
    try {
      setLoading(true)
      const result = await fetcher({ url: `https://ergast.com/api/f1/${year}/results.json?limit=500` })
      setDataResults(apiDataToTableData(result))
    } catch (e) {
      message(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [year])

  return (
    <SeasonSummaryLayout loading={loading}/>
  )
}
