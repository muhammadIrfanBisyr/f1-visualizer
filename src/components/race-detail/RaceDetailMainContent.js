import React, { useContext } from 'react'
import { Card, Space, Collapse, Typography } from 'antd'

import RaceDetailContext from './context/RaceDetailContext'
import LineChart from './main-content/RaceDetailLineChart'
import ChartTypeSelect, { CHART_TYPE_OPTIONS } from '../global/select/ChartTypeSelect'
import Select from '../global/select/Select'
import { SESSION, SPRINT_RACE_CONST, getSessionKeyFromValue } from '../global/constant/Session'

import RaceDetailTable from './main-content/RaceDetailTable'

const { Panel } = Collapse
const { Title } = Typography

const SessionSelect = () => {
  const { year, trackId, session, actions: { setSession } } = useContext(RaceDetailContext)

  const options = Object
    .values(SESSION)
    .filter((item) => item.value !== SESSION.SPRINT.value || SPRINT_RACE_CONST.has(`${year}_${trackId}`))

  return (
    <Select
      onChange={(val) => setSession(val)}
      width={110} options={options}
      value={session}
    />
  )
}

const SettingMenu = () => {
  const { year, chartType, session, actions: { setChartType } } = useContext(RaceDetailContext)
  const txtSession = SESSION[getSessionKeyFromValue('value', session)].title

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
