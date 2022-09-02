import React, { useContext, useEffect, useState } from 'react'
import { List, Card, Avatar, Space, Divider, Typography } from 'antd'
import { CrownOutlined, TrophyOutlined, ThunderboltOutlined, PoundCircleOutlined } from '@ant-design/icons'

import TeamLogo from '../../global/logo/TeamLogo'
import CountryFlag from '../../global/flag/CountryFlag'
import { handleAPIDriver } from '../helper/handler'
import { TEAM_CONST } from '../../global/constant/Teams'
import DriverInfoContext from '../context/DriverInfoContext'

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
  const { year } = useContext(DriverInfoContext)

  const [driverData, setDriverData] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    handleAPIDriver({ year }, { setLoading, setDriverData })
  }, [year])

  return (
    <div className='driver-list'>
      <List
        loading={loading}
        grid={{ gutter: 16, column: 4 }}
        dataSource={driverData}
        renderItem={(item) => (
            <List.Item>
                <Card className='driver-card'>
                    <div className='constructor-background' style={{ backgroundColor: TEAM_CONST[item.constructorId]?.color ?? '#ffffff' }}>
                      <TeamLogo name={item.constructorId}/>
                    </div>
                    <Avatar size={100} style={{ marginTop: '16px', border: '3px solid #ffffff' }}/>
                    <Title level={4}>{item?.name}</Title>
                    <Space className='driver-info'>
                      <CountryFlag nationality={item.nationality}/>
                      <Text>{item?.number}</Text>
                    </Space>
                    <Divider/>
                    <DriverStats statsData={{
                      points: item.points,
                      wins: item.wins,
                      constructor: item.constructorId
                    }}/>
                </Card>
            </List.Item>
        )}
    />
    </div>
  )
}
