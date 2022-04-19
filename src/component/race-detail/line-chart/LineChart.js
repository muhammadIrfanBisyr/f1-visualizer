import React, {useEffect, useState, useContext} from 'react';
import { Select } from 'antd';
import { Line } from '@ant-design/plots';

import RaceDetailContext from '../context/RaceDetailContext';

import { handleAPILineChart } from '../helper/handler';
import { milisecondsToLapTime } from '../helper/utils';
import { TEAM_CONST } from '../../global/constant/Teams'

const { Option } = Select;

export default function LineChart(){

    const {track, year} = useContext(RaceDetailContext);

    const [allData, setAllData] = useState({});
    const [isLoading, setLoading] = useState(false);
    
    const [yAxis, setYAxis] = useState('pos');

    useEffect(() => {
        handleAPILineChart({track, year}, {setAllData, setLoading})
    }, [track, year])

    return (
        <>
            <Line 
                className='main-line-chart'
                data={allData?.chartData ?? []} 
                xField='lapNo' 
                yField={yAxis}
                yAxis={{
                    label: {
                        formatter: (item) => {
                            const formatted = yAxis === 'pos' ?  Math.abs(item) : milisecondsToLapTime(-item);
                            return formatted;
                        },
                    },
                    ...( yAxis === 'pos' ? {tickInterval: 1} : {tickInterval: 5000}),
                    ...( yAxis === 'time' ? {max: allData?.chartLimit[1]} : {max: null}),
                    ...( yAxis === 'time' ? {min: allData?.chartLimit[0]} : {min: null}),
                }}
                tooltip={{
                    formatter: (item) => {
                        const value = yAxis === 'pos' ?  Math.abs(item.pos) : milisecondsToLapTime(-item.time);
                        return { name: item.driverId, value};
                    },
                }}
                seriesField='driverId'
                loading={isLoading}
                colorField='driverId' 
                color= {({driverId}) => TEAM_CONST[allData.driverTable[driverId]] ? TEAM_CONST[allData.driverTable[driverId]].color : '#000000'}
            />

            <Select 
                defaultValue={yAxis} 
                value={yAxis}
                className='chart-type-select'
                onChange={(val) => {setYAxis(val)}}
            >
                <Option value='pos'> Position Changes </Option>
                <Option value='time'> Lap Times </Option>
            </Select>
        </>
    )
}