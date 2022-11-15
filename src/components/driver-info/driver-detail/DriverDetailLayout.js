import React from 'react'
import { Row, Col } from 'antd'

import DriverDetailProfile from './DriverDetailProfile'
import DriverDetailChart from './DriverDetailChart'

export default function DriverDetailLayout () {
  return (
    <Row gutter={16}>
      <Col span={12}>
        <DriverDetailProfile/>
      </Col>
      <Col span={12}>
        <DriverDetailChart/>
      </Col>
      <Col>
        {/* <Table/> */}
      </Col>
    </Row>
  )
}
