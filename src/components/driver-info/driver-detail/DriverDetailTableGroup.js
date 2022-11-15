import React, { useContext, useMemo } from 'react'

import { Table, Card, Typography } from 'antd'

import DriverDetailContext from '../context/DriverDetailContext'
import { handleDriverRaceDetail } from '../helper/DriverInfoAPI'
import { generateCountryColumn } from '../../global/table/TableHelper'

const DriverDetailTable = ({ year, data }) => {
  const tableColumn = useMemo(() => Object.entries(data).map(
    ([key, val]) => generateCountryColumn(key, val.country, year, val.round)
  ), [data])

  return (
    <div className='driver-detail-race-detail-table'>
      <Typography.Title level={5}>{`${year} Season Results`}</Typography.Title>
      <Table size='small' pagination={false} columns={tableColumn} dataSource={[data]} />
    </div>
  )
}

export default function DriverDetailTableGroup () {
  const { detailData, loading } = useContext(DriverDetailContext)
  const tableData = useMemo(() => handleDriverRaceDetail(detailData), [detailData])

  return (
    <Card
      className='driver-detail-race-detail'
      loading={loading}
    >
    {
      Object.entries(tableData).map(([key, value]) => (
        <DriverDetailTable key={`detail_${key}`} year={key} data={value}/>
      ))
    }
    </Card>
  )
}
