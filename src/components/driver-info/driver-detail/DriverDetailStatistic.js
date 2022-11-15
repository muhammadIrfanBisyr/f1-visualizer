import React, { useContext, useMemo } from 'react'
import { Table } from 'antd'
import { handleDriverStatistic } from '../helper/DriverInfoAPI'

import DriverDetailContext from '../context/DriverDetailContext'

const TABLE_COLUMN = [
  {
    title: 'Entries',
    dataIndex: 'entries',
    key: 'entries'
  },
  {
    title: 'Championships',
    dataIndex: 'championships',
    key: 'championships'
  },
  {
    title: 'Wins',
    dataIndex: 'wins',
    key: 'wins'
  }, {
    title: 'Podiums',
    dataIndex: 'podiums',
    key: 'podiums'
  }, {
    title: 'Points',
    dataIndex: 'points',
    key: 'points'
  }, {
    title: 'Pole',
    dataIndex: 'pole',
    key: 'pole'
  }, {
    title: 'Fastest laps',
    dataIndex: 'fastestLaps',
    key: 'fastestLaps'
  }
]

export default function DriverDetailStatic () {
  const { loading, summaryData } = useContext(DriverDetailContext)
  const dataColumn = useMemo(() => handleDriverStatistic(summaryData), [summaryData])

  return (
    <Table
      size='small'
      loading={loading}
      columns={TABLE_COLUMN}
      dataSource={dataColumn}
      pagination={false}
    />
  )
}
