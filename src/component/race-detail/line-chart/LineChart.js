import React, {useEffect, useState, useContext} from 'react';
import { Line } from '@ant-design/plots';

import RaceDetailContext from '../context/RaceDetailContext';

import {handleAPILineChart} from '../helper/handler';

export default function LineChart(){

    const {track, year} = useContext(RaceDetailContext);

    const [allData, setAllData] = useState([]);

    useEffect(() => {
        handleAPILineChart({track, year}, {setAllData})
    }, [track, year])

    return (
        <Line 
            className='main-line-chart'
            data={allData} 
            xField='lapNo' 
            yField= 'pos' 
            yAxis = {{
                label: {
                    formatter: (v) => Math.abs(v),
                },
            }}
            tooltip = {{
                formatter: (item) => {
                  return { name: item?.driverId, value: Math.abs(item?.pos)};
                },
            }}
            seriesField='driverId' 
        />
    )
}