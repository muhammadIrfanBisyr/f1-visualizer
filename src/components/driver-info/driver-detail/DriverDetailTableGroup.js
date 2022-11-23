import React, { useContext, useMemo } from 'react'

import { Table, Typography, Card, Row, Col } from 'antd'

import { generateCountryColumn } from '../../global/table/TableHelper'
import TeamLogo from '../../global/logo/TeamLogo'

import DriverDetailContext from '../context/DriverDetailContext'
import { handleDriverRaceDetail, handleDriverSummary } from '../helper/DriverInfoAPI'

export const CONSTRUCTOR_COLUMN = {
  key: 'constructor',
  title: 'Constructor',
  dataIndex: 'constructorName',
  render: (constructorName, record) => (
        <div>
            <TeamLogo name={record.constructorId}/>
            {` ${constructorName}`}
        </div>
  ),
  width: 120
}

const DriverDetailTable = ({ year, data, constructorData }) => {
  const tableColumn = useMemo(() => Object.entries(data).map(
    ([key, val]) => generateCountryColumn(key, val.country, year, val.round, 60)
  ), [data])

  return (
    <Col span={24}>
      <Card
        title={<Typography.Title level={5}>{`${year} Season Results`}</Typography.Title>}
        className='driver-detail-race-detail-table'
        bodyStyle={{ padding: '4px' }}
      >
        <Table
          size='small'
          pagination={false}
          columns={[CONSTRUCTOR_COLUMN, ...tableColumn]}
          dataSource={[{ ...data, ...constructorData }]}
        />
      </Card>
    </Col>
  )
}

export default function DriverDetailTableGroup () {
  const { detailData, summaryData } = useContext(DriverDetailContext)

  const tableData = useMemo(() => handleDriverRaceDetail(detailData), [detailData])
  const constructorData = useMemo(() =>
    handleDriverSummary(summaryData)?.map((item) => ({
      constructorId: item.constructor,
      constructorName: item.constructorName
    })), [summaryData])

  return (
    <Row className='driver-detail-race-detail' gutter={[16, 16]}>
    {
      Object.entries(tableData).map(([key, value], index) => (
        <DriverDetailTable key={`detail_${key}`} year={key} data={value} constructorData={constructorData[index]}/>
      ))
    }
    </Row>
  )
}
