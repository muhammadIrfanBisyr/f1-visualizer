import React from 'react';
import {TableOutlined, LineChartOutlined } from '@ant-design/icons';

import { Select } from 'antd';

const { Option } = Select;

export default function ChartTypeSelect(){
    return(
        <Select 
            defaultValue='T' 
            className='chart-type-select'
            onChange={() => {}}
        >
            <Option value='T'> <TableOutlined/> Table</Option>
            <Option value='R'> <LineChartOutlined/> Line Chart</Option>
        </Select>
    );
}