import React, {useContext} from 'react';
import {Card, Space} from 'antd';
import { EnvironmentOutlined, ClockCircleOutlined } from '@ant-design/icons'

import RaceDetailContext from './context/RaceDetailContext';
import TrackSelect from './select/TrackSelect';
import YearSelect from './select/YearSelect';

import CountryFlag from '../global/flag/CountryFlag';
import image from '../../asset/track-map/bahrain.png'

export default function TrackInfo(){

    const {trackInfo} = useContext(RaceDetailContext);
 
    return (
        <Card className='track-info-container'>
            <Space><YearSelect/><TrackSelect/></Space>
            

            <img src={image} alt='track' className='track-image'/>
            <div className='track-info-text-container'>
                <p style={{'textAlign': 'center'}}>{`${trackInfo.trackName}`}</p>
                <div><EnvironmentOutlined/> <CountryFlag name='australian'/>{` ${trackInfo.locality}, ${trackInfo.country} `}</div>
                <div><ClockCircleOutlined/>{` ${trackInfo.date} ${trackInfo.time} `}</div>
            </div>
        </Card>
    )
}