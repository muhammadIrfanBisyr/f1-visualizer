import React, { useContext } from 'react'
import Card from 'antd/lib/card/Card'
import { Collapse, Space, Typography } from 'antd'

import ChartTypeSelect from '../global/select/ChartTypeSelect'
import YearSelect from '../global/select/YearSelect'
import TypeSelect from '../global/select/TypeSelect'

import SeasonSummaryContext from './context/SeasonSummaryContext'
import SeasonSummaryTable from './main-content/SeasonSummaryTable'
import SeasonSummaryLine from './main-content/SeasonSummaryLine'

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

const ContentSwitch = () => {
  const { chartType } = useContext(SeasonSummaryContext)

  switch (chartType) {
    case 'T':
      return (<SeasonSummaryTable/>)
    case 'L':
      return (<SeasonSummaryLine/>)
    default:
      return (<></>)
  }
}

export default function SeasonSummaryMainContent () {
  return (
    <Card
      className='main-summary-content-container'
      title={<SettingMenu/>}
    >
      <ContentSwitch/>
    </Card>
  )
}
