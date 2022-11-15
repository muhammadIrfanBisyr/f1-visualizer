import React from 'react'
import { Row, Col } from 'antd'

import DriverDetailProfile from './DriverDetailProfile'
import DriverDetailChart from './DriverDetailChart'
import DriverDetailTableGroup from './DriverDetailTableGroup'

export default function DriverDetailLayout () {
  return (
    <Row gutter={[16, 16]}>
      <Col span={12}>
        <DriverDetailProfile/>
      </Col>
      <Col span={12}>
        <DriverDetailChart/>
      </Col>
      <Col span={24}>
        <DriverDetailTableGroup/>
      </Col>
    </Row>
  )
}
