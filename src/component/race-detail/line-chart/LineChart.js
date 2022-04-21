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
    const [chartConfig, setChartConfig] = useState({
        title: 'Position',
        tickInterval: 1,
        max: null,
        min: null
    });

    useEffect(() => {
        handleAPILineChart({track, year}, {setAllData, setLoading})
    }, [track, year])

    useEffect(() => {
        switch(yAxis){
            case 'time':
                setChartConfig({
                    title: 'Lap Time',
                    tickInterval: 5000,
                    max: allData?.chartLimit?.[1],
                    min: allData?.chartLimit?.[0]
                }) 
                break;
            case 'pos':
            default:
                setChartConfig({
                    title: 'Position',
                    tickInterval: 1,
                    max: null,
                    min: null
                })
                break;
        }
    }, [yAxis, allData])

    return (
        <div className='main-line-chart-container'>
            <Line 
                className='main-line-chart'
                data={allData?.chartData ?? []} 
                xField='lapNo' 
                yField={yAxis}
                xAxis={{
                    title:{
                        text: 'Lap Number'
                    }
                }}
                yAxis={{
                    title: {
                        text: chartConfig.title
                    },  
                    label: {
                        formatter: (item) => {
                            const formatted = yAxis === 'pos' ?  Math.abs(item) : milisecondsToLapTime(-item);
                            return formatted;
                        },
                    },
                    tickInterval: chartConfig.tickInterval,
                    max: chartConfig.max,
                    min: chartConfig.min
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
                className='chart-data-type-select'
                defaultValue={yAxis} 
                value={yAxis}
                onChange={(val) => {setYAxis(val)}}
            >
                <Option value='pos'> Position Changes </Option>
                <Option value='time'> Lap Times </Option>
            </Select>
        </div>
    )
}