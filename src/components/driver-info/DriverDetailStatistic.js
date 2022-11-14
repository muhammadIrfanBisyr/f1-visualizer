import React, { useState, useEffect } from 'react'
import { Table, message } from 'antd'
import { handleDriverStatistic } from './helper/DriverInfoAPI'

import useFetchAPI from '../../hooks/useFetchAPI'

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

export default function DriverDetailStatic ({ driverId }) {
  const fetcher = useFetchAPI()
  const [loading, setLoading] = useState(false)
  const [dataResult, setDataResult] = useState([])
  const fetchData = async () => {
    try {
      setLoading(true)
      const result = await fetcher({ url: `http://ergast.com/api/f1/drivers/${driverId}/driverStandings.json?limit=500` })
      setDataResult(handleDriverStatistic(result))
    } catch (e) {
      message(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (driverId) { fetchData() }
  }, [driverId])

  return (
    <Table
      size='small'
      loading={loading}
      columns={TABLE_COLUMN}
      dataSource={dataResult}
      pagination={false}
    />
  )
}
