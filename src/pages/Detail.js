import React from 'react';

import RaceDetailContent from '../component/race-detail/RaceDetailContent';
import RaceDetailContextProvider from '../component/race-detail/context/RaceDetailContextProvider';

export default function Detail(){
    return (
        <RaceDetailContextProvider>
            <RaceDetailContent/>
        </RaceDetailContextProvider>
    )
}