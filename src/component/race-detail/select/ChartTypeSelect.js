import React, { useContext } from 'react';
import {TableOutlined, LineChartOutlined} from '@ant-design/icons';

import RaceDetailContext from '../context/RaceDetailContext';

import { Select } from 'antd';

const { Option } = Select;

export default function ChartTypeSelect(){

    const {session, chartType, actions: {setChartType}} = useContext(RaceDetailContext);

    return(
        <Select 
            defaultValue='T' 
            value={chartType}
            className='chart-type-select'
            onChange={(val) => {setChartType(val)}}
        >
            <Option value='T'> <TableOutlined/> Table</Option>
            {
                session === 'R' &&
                <Option value='L'> <LineChartOutlined/> Line Chart</Option>
            }
        </Select>
    );
}