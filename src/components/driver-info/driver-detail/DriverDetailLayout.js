import React from 'react'
import { Row, Col } from 'antd'
import DriverDetailProfile from './DriverDetailProfile'

export default function DriverDetailLayout () {
  return (
    <Row gutter={16}>
      <Col span={12}>
        <DriverDetailProfile/>
      </Col>
      <Col span={12}>
        {/* <Card style={{ margin: '0 auto' }}>
          <Line data={[]}/>
        </Card> */}
      </Col>
      <Col>
        {/* <Table/> */}
      </Col>
    </Row>
  )
}
