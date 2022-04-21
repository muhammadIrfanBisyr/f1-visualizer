import React, { useContext } from 'react';
import { Select } from 'antd';

import RaceDetailContext from '../context/RaceDetailContext';

const { Option } = Select;

export default function SessionSelect() {

    const {session, actions : {setSession}} = useContext(RaceDetailContext);

    return(
        <Select 
            defaultValue='R' 
            value={session} 
            className='session-select'
            onChange={(val) => { setSession(val) }}
        >
            <Option value='Q'>Qualifying</Option>
            <Option value='R'>Race</Option>
        </Select>
    );
}