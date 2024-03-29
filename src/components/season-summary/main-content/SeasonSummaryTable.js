import React, { useMemo, useContext } from 'react'

import Table from '../../global/table/Table'
import CountryFlag from '../../global/flag/CountryFlag'
import TeamLogo from '../../global/logo/TeamLogo'

import SeasonSummaryContext from '../context/SeasonSummaryContext'
import { calculateRowSpanConstructor } from '../helper/SeasonSummaryAPI'

export const DRIVER_COLUMN = {
  key: 'driver',
  title: 'Driver Name',
  dataIndex: 'driverName',
  render: (driverName, record) => (
        <div>
            <CountryFlag nationality={record.nationality}/>
            {` ${driverName}`}
        </div>
  ),
  width: 160
}

export const CONSTRUCTOR_COLUMN = {
  key: 'constructor',
  title: 'Constructor Name',
  dataIndex: 'constructorName',
  render: (constructorName, record) => (
        <div>
            <TeamLogo name={record.constructorId}/>
            {` ${constructorName}`}
        </div>
  ),
  onCell: (record) => (!record.firstCol ? { rowSpan: 0 } : { rowSpan: record.rowSpan }),
  width: 160
}

export const TOTAL_POINT_COLUMN = {
  key: 'points',
  title: 'Points',
  dataIndex: 'points',
  render: (points) => (
        <div className='table-result'>
            {points}
        </div>
  ),
  width: 50,
  sortOrder: 'descend',
  sorter: (a, b) => a.points - b.points
}

export const TOTAL_CONSTRUCTOR_POINT_COLUMN = {
  key: 'constructorPoints',
  title: 'Points',
  dataIndex: 'constructorPoints',
  render: (constructorPoints) => (
        <div className='table-result'>
            {constructorPoints}
        </div>
  ),
  width: 50,
  sortOrder: 'descend',
  sorter: (a, b) => a.constructorPoints - b.constructorPoints,
  onCell: (record) => (!record.firstCol ? { rowSpan: 0 } : { rowSpan: record.rowSpan })
}

export default function SeasonSummaryTable () {
  const { dataMode, dataResults, loading } = useContext(SeasonSummaryContext)

  const tableColumns = useMemo(
    () => dataMode === 'D'
      ? dataResults?.columns
      : [CONSTRUCTOR_COLUMN, ...dataResults?.columns.slice(1, -1), TOTAL_CONSTRUCTOR_POINT_COLUMN],
    [dataResults, dataMode])

  const tableData = useMemo(
    () => dataMode === 'D'
      ? dataResults?.dataSource
      : calculateRowSpanConstructor(dataResults?.dataSource),
    [dataResults, dataMode])

  return (
      <Table
        loading={loading}
        dataSource={tableData}
        columns={tableColumns}
      />
  )
}
