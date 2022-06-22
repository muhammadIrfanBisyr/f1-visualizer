import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Card, Space, Spin } from 'antd'
import { EnvironmentOutlined, ClockCircleOutlined, InfoCircleFilled } from '@ant-design/icons'

import RaceDetailContext from './context/RaceDetailContext'
import TrackInfoContextProvider from './context/TrackInfoContextProvider'
import TrackInfoContext from './context/TrackInfoContext'

import TrackSelect from './select/TrackSelect'
import YearSelect from '../global/select/YearSelect'

import CountryFlag from '../global/flag/CountryFlag'

function TrackInfoInnerComponent () {
  const { trackId, trackName, locality, country, date, time } = useContext(TrackInfoContext)
  const { loading, year } = useContext(RaceDetailContext)

  return (
        <Card className='track-info-container'>
            <Space size={4}>
                <Link to={`/summary/${year}`}>
                    <InfoCircleFilled className='year-info'/>
                </Link>
                <YearSelect context={RaceDetailContext}/>
                <TrackSelect/>
            </Space>
            <Spin spinning={loading}>
                <img src={`${process.env.PUBLIC_URL}/assets/track-map/${trackId.toLowerCase()}.png`} alt='track' className='track-image'/>
                <div className='track-info-text-container'>
                    <p style={{ textAlign: 'center' }}>{`${trackName}`}</p>
                    <div style={{ marginLeft: '10px' }}>
                        <EnvironmentOutlined/> <CountryFlag country={country} />{` ${locality}, ${country} `} <br/>
                        <ClockCircleOutlined/>{` ${date} ${time} `} <br/>
                    </div>
                </div>
            </Spin>
        </Card>
  )
}

export default function TrackInfo () {
  return (
        <TrackInfoContextProvider>
            <TrackInfoInnerComponent/>
        </TrackInfoContextProvider>
  )
}
