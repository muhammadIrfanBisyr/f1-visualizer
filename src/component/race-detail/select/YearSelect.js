import React, {useContext} from 'react';
import { Select } from 'antd';

import RaceDetailContext from '../context/RaceDetailContext';

const { Option } = Select;

export default function YearSelect() {
    
    const { year, actions: {setYear} } = useContext(RaceDetailContext);

    const yearStart = Array.from({length: 13}, (_, i) => i + 2010)

    return (
        <Select
            className='detail-title-selectable'
            showSearch
            placeholder="Select Year"
            optionFilterProp="children"
            onChange={(val) => { setYear(val) }}
            filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            defaultValue={year}
        >
            {
                yearStart.map((num) => (<Option value={num}>{num}</Option>))
            }
        </Select>
    )
}