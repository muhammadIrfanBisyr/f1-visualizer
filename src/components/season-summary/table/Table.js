import React, { useEffect, useState, useContext } from 'react'
import { message, Table as AntdTable } from 'antd'

import SeasonSummaryContext from '../context/SeasonSummaryContext'
import useFetchAPI from '../../../hooks/useFetchAPI'
import { apiDataToTableData } from '../helper/handler'

export default function Table () {
  const { year, dataResults, actions: { setDataResults } } = useContext(SeasonSummaryContext)
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
        <AntdTable
            className='main-table'
            columns={dataResults?.columns}
            dataSource={dataResults?.dataSource}
            loading={loading}
            pagination={false}
            size='small'
        />
  )
}
