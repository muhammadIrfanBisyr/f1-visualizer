import React, { useContext } from 'react'
import { Card, Row, Col, Typography } from 'antd'

import DriverAvatar from '../../global/avatar/DriverAvatar'
import CountryFlag from '../../global/flag/CountryFlag'

import DriverDetailStatistic from './DriverDetailStatistic'
import DriverDetailContext from '../context/DriverDetailContext'

const { Text, Title } = Typography

const DriverDetailText = ({ textData = [] }) => {
  return (
    <Row>
    {
      textData.map((item) => (
        <>
          <Col span={10}><Text strong> {item.label}</Text></Col>
          <Col span={14}>
            {item.icon}{` ${item.value}`}
          </Col>
        </>
      ))
    }
   </Row>
  )
}

export default function DriverDetailProfile () {
  const { loading, profileData } = useContext(DriverDetailContext)

  const textData = [
    {
      label: 'Nationality',
      value: profileData.nationality,
      icon: <CountryFlag nationality={profileData.nationality}></CountryFlag>
    },
    { label: 'Date of Birth', value: profileData.dateOfBirth },
    { label: 'Current Team', value: profileData.permanentNumber },
    { label: 'Car number', value: profileData.permanentNumber }
  ]

  return (
    <Card className='driver-profile' loading={loading}>
      <Row gutter={[4, 16]}>
        <Col>
          <DriverAvatar shape='square' driverId={profileData?.driverId} size={160}/>
        </Col>
        <Col span={16} style={{ marginLeft: '16px' }}>
          <Title level={3}>{`${profileData?.givenName} ${profileData?.familyName}`}</Title>
          <DriverDetailText textData={textData} />
        </Col>
        <Col span={24}>
          <DriverDetailStatistic/>
        </Col>
      </Row>
    </Card>
  )
}
