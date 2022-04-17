import React from 'react';
import { Select } from 'antd';

const { Option } = Select;

export default function RaceSessionSelect() {

    return(
        <Select defaultValue='R' className='session-select'>
            <Option value='Q'>Qualifying</Option>
            <Option value='R'>Race</Option>
        </Select>
    );
}