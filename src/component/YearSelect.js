import React from 'react';
import { Select } from 'antd';

const { Option } = Select;

export default function YearSelect({year, setYear}) {

    return (
        <Select
            showSearch
            placeholder="Select Year"
            optionFilterProp="children"
            onChange={(val) => {setYear(val)}}
            filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            defaultValue={year}
        >
            <Option value="2019">2019</Option>
            <Option value="2020">2020</Option>
            <Option value="2021">2021</Option>
        </Select>
    )
}