import React, { useEffect, useState, useContext } from 'react'
import { Table as AntdTable } from 'antd'

import SeasonSummaryContext from '../context/SeasonSummaryContext'

import { handleAPITable } from '../helper/handler'

export default function Table () {
  const { year } = useContext(SeasonSummaryContext)

  const [resultData, setResultData] = useState({})
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    handleAPITable({ year }, { setResultData, setLoading })
  }, [year])

  return (
        <AntdTable
            className='main-table'
            columns={resultData?.columns}
            dataSource={resultData?.dataSource}
            loading={loading}
            pagination={false}
            size='small'
        />
  )
}
