import React from 'react';
import { Typography } from 'antd';

import '../style/index.css';

import RaceDetailContent from '../component/race-detail/RaceDetailContent';
import RaceDetailContextProvider from '../component/race-detail/context/RaceDetailContextProvider';

const { Title } = Typography;

export default function MainPage(){

    return(
        <>
            <Title>
                F1 Visualizer
            </Title>
            
            <RaceDetailContextProvider>
                <RaceDetailContent/>
            </RaceDetailContextProvider>
        </>
    )
}