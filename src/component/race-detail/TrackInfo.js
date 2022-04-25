import React, {useContext} from 'react';
import {Card, Space, Skeleton} from 'antd';
import { EnvironmentOutlined, ClockCircleOutlined } from '@ant-design/icons'

import RaceDetailContext from './context/RaceDetailContext';
import TrackInfoContextProvider from './context/TrackInfoContextProvider';
import TrackInfoContext from './context/TrackInfoContext';

import TrackSelect from './select/TrackSelect';
import YearSelect from './select/YearSelect';

import CountryFlag from '../global/flag/CountryFlag';


function TrackInfoInnerComponent(){

    const {trackId, trackName, locality, country, date, time} = useContext(TrackInfoContext);
    const {loading} = useContext(RaceDetailContext);

    return(
        <Card className='track-info-container'>
            <Space><YearSelect/><TrackSelect/></Space>
            {
                loading ?
                <Skeleton active/>
                :
                <>
                    <img src={`${process.env.PUBLIC_URL}/assets/track-map/${trackId.toLowerCase()}.png`} alt='track' className='track-image'/>
                    <div className='track-info-text-container'>
                        <p style={{'textAlign': 'center'}}>{`${trackName}`}</p>
                        <div style={{'marginLeft': '10px'}}>
                            <EnvironmentOutlined/> <CountryFlag country={country} />{` ${locality}, ${country} `} <br/>
                            <ClockCircleOutlined/>{` ${date} ${time} `} <br/>
                        </div>
                    </div>
                </>
            }
        </Card>
    )
}

export default function TrackInfo(){
    return (
        <TrackInfoContextProvider>
            <TrackInfoInnerComponent/>
        </TrackInfoContextProvider>
    )
}