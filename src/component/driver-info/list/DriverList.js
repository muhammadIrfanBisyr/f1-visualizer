import React, { useEffect, useState } from 'react'
import { List, Card, Avatar, Space, Divider, Typography } from 'antd'
import { CrownOutlined, TrophyOutlined, ThunderboltOutlined, PoundCircleOutlined } from '@ant-design/icons'

import CountryFlag from '../../global/flag/CountryFlag'
import { handleAPIDriver } from '../helper/handler'

const { Title, Text } = Typography

const StatsDetail = ({ data, icon }) => {
  return (
    <span>
      {icon} <br/> {data}
    </span>
  )
}

const DriverStats = ({ statsData }) => {
  const statList = [
    { data: 0, icon: <CrownOutlined/> },
    { data: statsData.wins, icon: <TrophyOutlined/> },
    { data: 1, icon: <TrophyOutlined/> },
    { data: 2, icon: <TrophyOutlined/> },
    { data: 3, icon: <ThunderboltOutlined/> },
    { data: statsData.points, icon: <PoundCircleOutlined/> }
  ]

  return (
    <Space className='driver-stats-group' size='small'>
     {
      statList.map((item, index) => (
        <React.Fragment key={index}>
          <StatsDetail {...item}/>
          {
            index < statList.length - 1 &&
            <Divider type='vertical'></Divider>
          }
        </React.Fragment>
      ))
     }
    </Space>
  )
}

export default function DriverList () {
  const [driverData, setDriverData] = useState([])
  const [year, setYear] = useState('2022')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    handleAPIDriver({ year }, { setYear, setLoading, setDriverData })
  }, [])

  return (
        <List
            loading={loading}
            grid={{ gutter: 16, column: 4 }}
            dataSource={driverData}
            renderItem={(item) => (
                <List.Item>
                    <Card className='driver-card'>
                        <Avatar/>
                        <Title level={4}>{item?.name}</Title>
                        <Space className='driver-info'>
                          <CountryFlag nationality={item.nationality}/>
                          <Text>{item?.number}</Text>
                        </Space>
                        <DriverStats statsData={{
                          points: item.points,
                          wins: item.wins,
                          constructor: item.constructorId
                        }}/>
                    </Card>
                </List.Item>
            )}
        />
  )
}
