import React from 'react'
import { Select } from 'antd'

const { Option } = Select

export default function YearSelect ({ onChange, defaultValue }) {
  const yearStart = Array.from({ length: 13 }, (_, i) => i + 2010)

  return (
        <Select
            className='detail-title-selectable'
            showSearch
            placeholder="Select Year"
            optionFilterProp="children"
            onChange={onChange}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            defaultValue={defaultValue}
        >
            {
                yearStart.map((num) => (<Option key={num} value={num}>{num}</Option>))
            }
        </Select>
  )
}
