import React from 'react';
import { Select } from 'antd';

const { Option } = Select;

export default function YearSelect({year, setYear, setTrack}) {

    const yearStart = Array.from({length: 13}, (_, i) => i + 2010)

    return (
        <Select
            showSearch
            placeholder="Select Year"
            optionFilterProp="children"
            onChange={(val) => { setTrack('1'); setYear(val); }}
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