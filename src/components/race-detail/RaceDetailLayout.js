import React from 'react'
import { Row, Col } from 'antd'

import RaceDetailMainContent from './RaceDetailMainContent'
import RaceDetailSideContent from './RaceDetailSideContent'

export default function RaceDetailLayout () {
  return (
    <Row gutter={[16, 16]} >
        <Col span={18}>
            <RaceDetailMainContent/>
        </Col>
        <Col span={6}>
            <RaceDetailSideContent/>
        </Col>
    </Row>
  )
}
