import React, {useContext} from 'react';
import { Select } from 'antd';

const { Option } = Select;

export default function YearSelect({context}) {
    
    const { year, actions: {setYear} } = useContext(context);

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
                yearStart.map((num) => (<Option key={num} value={num}>{num}</Option>))
            }
        </Select>
    )
}