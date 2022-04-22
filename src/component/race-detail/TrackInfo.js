import React, {useContext} from 'react';
import {Card, Space} from 'antd';
import { EnvironmentOutlined, ClockCircleOutlined } from '@ant-design/icons'

import TrackInfoContext from './context/TrackInfoContext';

import TrackSelect from './select/TrackSelect';
import YearSelect from './select/YearSelect';

import CountryFlag from '../global/flag/CountryFlag';

export default function TrackInfo(){

    const {trackId, trackName, locality, country, date, time} = useContext(TrackInfoContext);
 
    return (
        <Card className='track-info-container'>
            <Space><YearSelect/><TrackSelect/></Space>
            <img src={`${process.env.PUBLIC_URL}/assets/track-map/${trackId}.png`} alt='track' className='track-image'/>
            <div className='track-info-text-container'>
                <p style={{'textAlign': 'center'}}>{`${trackName}`}</p>
                <div style={{'marginLeft': '10px'}}>
                    <EnvironmentOutlined/> <CountryFlag name='australian'/>{` ${locality}, ${country} `} <br/>
                    <ClockCircleOutlined/>{` ${date} ${time} `} <br/>
                </div>
            </div>
        </Card>
    )
}