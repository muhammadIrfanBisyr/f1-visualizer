import React from 'react';

import Content from '../component/race-detail/Content';
import RaceDetailContextProvider from '../component/race-detail/context/RaceDetailContextProvider';

export default function Detail({match: {params}}) {

    console.log(params, 'a')

    return (
        <RaceDetailContextProvider>
            <Content/>
        </RaceDetailContextProvider>
    )
}