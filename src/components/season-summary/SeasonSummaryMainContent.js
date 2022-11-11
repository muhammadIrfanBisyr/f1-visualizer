import React, { useContext, useMemo } from 'react'
import Card from 'antd/lib/card/Card'
import { Collapse, Space, Typography } from 'antd'

import ChartTypeSelect from '../global/select/ChartTypeSelect'
import YearSelect from '../global/select/YearSelect'
import TypeSelect from '../global/select/TypeSelect'
import Table from '../global/table/Table'

import SeasonSummaryContext from './context/SeasonSummaryContext'
import { CONSTRUCTOR_COLUMN, TOTAL_CONSTRUCTOR_POINT_COLUMN } from './table/TableConstant'
import { calculateRowSpanConstructor } from './helper/handler'

const { Panel } = Collapse
const { Title } = Typography

const SettingMenu = () => {
  const { year, dataMode, chartType, actions: { setYear, setDataMode, setChartType } } = useContext(SeasonSummaryContext)

  return (
    <Collapse bordered={false} expandIconPosition='right'>
        <Panel header={<Title level={3}>{`F1 ${year} Season Summary - ${dataMode === 'D' ? 'Driver' : 'Constructor'} Standing`}</Title>} key="1">
          <Space>
            Year <YearSelect defaultValue={year} onChange={(val) => setYear(val)}/>
            View Type <ChartTypeSelect defaultValue={chartType} onChange={(val) => setChartType(val)} width={125}/>
            Show By <TypeSelect defaultValue={dataMode} onChange={(val) => setDataMode(val)} width={135}/>
          </Space>
        </Panel>
    </Collapse>
  )
}

const SeasonSummaryTable = ({ loading }) => {
  const { dataMode, dataResults } = useContext(SeasonSummaryContext)

  const tableColumns = useMemo(
    () => dataMode === 'D'
      ? dataResults?.columns
      : [CONSTRUCTOR_COLUMN, ...dataResults?.columns.slice(1, -1), TOTAL_CONSTRUCTOR_POINT_COLUMN],
    [dataResults, dataMode])

  const tableData = useMemo(
    () => dataMode === 'D'
      ? dataResults?.dataSource
      : calculateRowSpanConstructor(dataResults?.dataSource), [dataResults, dataMode])

  return (
    <Table loading={loading} dataSource={tableData} columns={tableColumns} />
  )
}

export default function SeasonSummaryMainContent ({ loading }) {
  return (
    <Card
      className='main-summary-content-container'
      title={<SettingMenu/>}
    >
      <SeasonSummaryTable loading={loading}/>
    </Card>
  )
}
