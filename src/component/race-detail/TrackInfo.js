import React, {useContext} from 'react';
import {Card, Space} from 'antd';
import { EnvironmentOutlined, ClockCircleOutlined } from '@ant-design/icons'

import RaceDetailContext from './context/RaceDetailContext';
import TrackSelect from './select/TrackSelect';
import YearSelect from './select/YearSelect';

import CountryFlag from '../global/flag/CountryFlag';

export default function TrackInfo(){

    const {trackInfo} = useContext(RaceDetailContext);
 
    return (
        <Card className='track-info-container'>
            <Space><YearSelect/><TrackSelect/></Space>
            <img src={`${process.env.PUBLIC_URL}/assets/track-map/${trackInfo.trackId}.png`} alt='track' className='track-image'/>
            <div className='track-info-text-container'>
                <p style={{'textAlign': 'center'}}>{`${trackInfo.trackName}`}</p>
                <div style={{'marginLeft': '10px'}}>
                    <EnvironmentOutlined/> <CountryFlag name='australian'/>{` ${trackInfo.locality}, ${trackInfo.country} `} <br/>
                    <ClockCircleOutlined/>{` ${trackInfo.date} ${trackInfo.time} `} <br/>
                </div>
            </div>
        </Card>
    )
}