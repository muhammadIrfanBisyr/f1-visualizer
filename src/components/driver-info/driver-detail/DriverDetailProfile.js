import React, { useContext } from 'react'
import { Card, Row, Col, Typography, Space } from 'antd'

import DriverDetailStatistic from './DriverDetailStatistic'
import DriverAvatar from '../../global/avatar/DriverAvatar'
import DriverDetailContext from '../context/DriverDetailContext'

const { Text, Title } = Typography

export default function DriverDetailProfile () {
  const { loading, profileData } = useContext(DriverDetailContext)

  return (
    <Card className='driver-profile' loading={loading}>
      <Row gutter={[4, 16]}>
        <Col>
          <DriverAvatar shape='square' driverId={profileData?.driverId} size={160}/>
        </Col>
        <Col span={16} style={{ marginLeft: '16px' }}>
          <Title level={3}>{`${profileData?.givenName} ${profileData?.familyName}`}</Title>
          <Space direction='vertical' size='small'>
            <span><Text strong> Nationality</Text> {profileData.nationality}</span>
            <span><Text strong> Date of Birth</Text> {profileData.dateOfBirth}</span>
            <span><Text strong> Current Team</Text> {profileData.permanentNumber}</span>
            <span><Text strong> Car number</Text> {profileData.permanentNumber}</span>
          </Space>
        </Col>
        <Col span={24}>
          <DriverDetailStatistic/>
        </Col>
      </Row>
    </Card>
  )
}
