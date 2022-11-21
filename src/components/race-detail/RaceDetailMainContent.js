import React, { useContext } from 'react'
import { Card, Space, Collapse, Typography } from 'antd'

import RaceDetailContext from './context/RaceDetailContext'
import LineChart from './main-content/RaceDetailLineChart'
import ChartTypeSelect, { CHART_TYPE_OPTIONS } from '../global/select/ChartTypeSelect'
import SessionSelect from './select/SessionSelect'

import RaceDetailTable from './main-content/RaceDetailTable'

const { Panel } = Collapse
const { Title } = Typography

const SESSION = {
  Q: 'Qualification',
  S: 'Sprint Race',
  R: 'Race'
}

const SettingMenu = () => {
  const { year, chartType, session, actions: { setChartType } } = useContext(RaceDetailContext)
  const txtSession = SESSION[session]

  return (
    <Collapse bordered={false} expandIconPosition='right'>
      <Panel header={<Title level={3}>{`F1 ${year} ${txtSession} Results`}</Title>} key="1">
        <Space>
          Session <SessionSelect/>
          View Type
          <ChartTypeSelect
            value={chartType}
            defaultValue={chartType}
            onChange={(val) => setChartType(val)}
            width={125}
            options={session === 'R' ? CHART_TYPE_OPTIONS : CHART_TYPE_OPTIONS.slice(0, 1)}/>
        </Space>
      </Panel>
  </Collapse>

  )
}

const ContentSwitch = () => {
  const { chartType } = useContext(RaceDetailContext)

  switch (chartType) {
    case 'T':
      return (<RaceDetailTable/>)
    case 'L':
      return (<LineChart/>)
    default:
      return (<></>)
  }
}

export default function RaceDetailMainContent () {
  return (
    <Card
      className='main-detail-content-container'
      title={<SettingMenu/>}
    >
      <ContentSwitch/>
    </Card>
  )
}
