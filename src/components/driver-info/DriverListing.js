import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { List, Card, Space, Divider, Typography, Tooltip, Collapse } from 'antd'
import { CrownFilled, TrophyFilled, ThunderboltFilled, DollarCircleFilled } from '@ant-design/icons'

import TeamLogo from '../global/logo/TeamLogo'
import CountryFlag from '../global/flag/CountryFlag'
import { handleAPIDriver } from './helper/handler'
import { TEAM_CONST } from '../global/constant/Teams'
import DriverListContext from './context/DriverListContext'
import DriverAvatar from '../global/avatar/DriverAvatar'

import { PODIUM_COLOR } from '../../components/global/constant/Podium'
import YearSelect from '../global/select/YearSelect'

const { Title, Text } = Typography

const StatsDetail = ({ data, icon, color = '#000000' }) => {
  return (
    <>
      <div style={{ color }}>{icon} </div>
      <div>{data}</div>
    </>
  )
}

const DriverStats = ({ statsData }) => {
  const statList = [
    { data: 0, icon: <CrownFilled/>, color: PODIUM_COLOR.first },
    { data: statsData.wins, icon: <TrophyFilled/>, color: PODIUM_COLOR.third },
    { data: 0, icon: <ThunderboltFilled/>, color: PODIUM_COLOR.fastest },
    { data: statsData.points, icon: <DollarCircleFilled/> }
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

const DriverCard = ({ driverData }) => {
  return (
    <Card className='driver-card'>
      <div className='constructor-background' style={{ backgroundColor: TEAM_CONST[driverData.constructorId]?.color ?? '#ffffff' }}>
        <TeamLogo name={driverData.constructorId}/>
      </div>
      <DriverAvatar
        size={100}
        driverId={driverData.driverId}
        style={{ marginTop: '16px', border: '3px solid #ffffff' }}
      />
        <Title level={4}>{driverData?.name}</Title>
      <Space className='driver-info'>
        <CountryFlag nationality={driverData.nationality}/>
        <Text>{driverData?.number}</Text>
      </Space>
      <Divider/>
      <DriverStats statsData={{
        points: driverData.points,
        wins: driverData.wins,
        constructor: driverData.constructorId
      }}/>
  </Card>
  )
}

const FilterMenu = () => {
  const { year, actions: { setYear } } = useContext(DriverListContext)
  return (
    <Collapse bordered={false} expandIconPosition='right'>
      <Collapse.Panel header={<Title level={3}>{`F1 ${year} Driver List`}</Title>} key="1">
        <Space>
          Year <YearSelect defaultValue={year} onChange={(val) => setYear(val)}/>
        </Space>
      </Collapse.Panel>
  </Collapse>

  )
}

export default function DriverListing () {
  const { year, loading, actions: { setLoading } } = useContext(DriverListContext)
  const [driverData, setDriverData] = useState([])

  useEffect(() => {
    handleAPIDriver({ year }, { setLoading, setDriverData })
  }, [year])

  return (
    <Card
      className='driver-list'
      bodyStyle={{ padding: '8px' }}
    >
      <List
        header={<FilterMenu/>}
        loading={loading}
        grid={{ gutter: 16, column: 4 }}
        dataSource={driverData}
        renderItem={(item) => (
          <List.Item>
            <Tooltip title={'View the driver information'}>
              <Link to={`/driver/${item.driverId}`}>
                <DriverCard driverData={item}/>
              </Link>
            </Tooltip>
          </List.Item>
        )}
    />
    </Card>
  )
}
