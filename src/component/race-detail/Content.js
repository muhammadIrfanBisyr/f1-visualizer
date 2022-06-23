import React, { useContext } from 'react'
import { Space, Row, Col, Card } from 'antd'

import RaceDetailContext from './context/RaceDetailContext'

import Table from './table/Table'
import LineChart from './line-chart/LineChart'
import TrackInfo from './TrackInfo'
import Podium from './Podium'

import SessionSelect from './select/SessionSelect'
import ChartTypeSelect from './select/ChartTypeSelect'

export default function Content () {
  const { chartType } = useContext(RaceDetailContext)

  return (
        <Row>
            <Col span={18}>
                <Card
                    className='main-detail-content-container'
                    title={
                        <Row>
                            <Col span={21}>
                                <Space>
                                    <SessionSelect/> <div className='card-title'> Session Result </div>
                                </Space>
                            </Col>
                            <Col span={3}>
                                <Row justify='end'>
                                    <ChartTypeSelect />
                                </Row>
                            </Col>
                        </Row>
                    }
                >
                    {
                        chartType === 'T'
                          ? <Table/>
                          : <LineChart/>
                    }
                </Card>
            </Col>
            <Col span={6}>
                <Row>
                    <Col>
                        <TrackInfo/>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Podium/>
                    </Col>
                </Row>
            </Col>
        </Row>
  )
}
