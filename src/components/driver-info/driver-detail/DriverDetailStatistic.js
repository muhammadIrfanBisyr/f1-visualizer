import React, { useContext, useMemo } from 'react'
import { Table } from 'antd'
import { handleDriverStatistic } from '../helper/DriverInfoAPI'

import DriverDetailContext from '../context/DriverDetailContext'

const TABLE_COLUMN = [
  {
    title: 'Entries',
    dataIndex: 'entries',
    key: 'entries',
    align: 'center'
  },
  {
    title: 'Championships',
    dataIndex: 'championships',
    key: 'championships',
    align: 'center'
  },
  {
    title: 'Wins',
    dataIndex: 'wins',
    key: 'wins',
    align: 'center'
  }, {
    title: 'Podiums',
    dataIndex: 'podiums',
    key: 'podiums',
    align: 'center'
  }, {
    title: 'Points',
    dataIndex: 'points',
    key: 'points',
    align: 'center'
  }, {
    title: 'Pole',
    dataIndex: 'pole',
    key: 'pole',
    align: 'center'
  }, {
    title: 'Fastest laps',
    dataIndex: 'fastestLaps',
    key: 'fastestLaps',
    align: 'center'
  }
]

export default function DriverDetailStatistic () {
  const { loading, summaryData } = useContext(DriverDetailContext)
  const dataColumn = useMemo(() => handleDriverStatistic(summaryData), [summaryData])

  return (
    <Table
      className='driver-detail-statistic-table'
      size='small'
      loading={loading}
      columns={TABLE_COLUMN}
      dataSource={dataColumn}
      pagination={false}
    />
  )
}
