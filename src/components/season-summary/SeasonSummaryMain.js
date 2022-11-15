import React, { useEffect, useContext } from 'react'

import { message } from 'antd'

import SeasonSummaryContext from './context/SeasonSummaryContext'
import SeasonSummaryLayout from './SeasonSummaryLayout'

import useFetchAPI from '../../hooks/useFetchAPI'
import { apiDataToTableData } from './helper/SeasonSummaryAPI'

export default function SeasonSummaryMain () {
  const { year, actions: { setDataResults, setLoading } } = useContext(SeasonSummaryContext)
  const fetcher = useFetchAPI()

  const fetchData = async () => {
    try {
      setLoading(true)
      const [result] = await fetcher({ urls: [`https://ergast.com/api/f1/${year}/results.json?limit=500`] })
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
    <SeasonSummaryLayout/>
  )
}
