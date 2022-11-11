import React, { useContext } from 'react'
import { Card, Row, Col, Space } from 'antd'

import RaceDetailContext from './context/RaceDetailContext'
import LineChart from './line-chart/LineChart'
import ChartTypeSelect, { CHART_TYPE_OPTIONS } from '../global/select/ChartTypeSelect'
import SessionSelect from './select/SessionSelect'

import RaceDetailTable from './main-content/RaceDetailTable'

const SettingMenu = () => {
  const { chartType, session, actions: { setChartType } } = useContext(RaceDetailContext)

  return (
    <Row>
      <Col span={21}>
          <Space>
              <SessionSelect/> <div className='card-title'> Session Result </div>
          </Space>
      </Col>
      <Col span={3}>
          <Row justify='end'>
              <ChartTypeSelect
                defaultValue={chartType}
                onChange={setChartType}
                options={session === 'R' ? CHART_TYPE_OPTIONS : CHART_TYPE_OPTIONS.slice(0, 1)}
              />
          </Row>
      </Col>
  </Row>
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
