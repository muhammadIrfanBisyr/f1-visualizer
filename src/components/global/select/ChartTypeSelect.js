import React from 'react'
import { TableOutlined, LineChartOutlined } from '@ant-design/icons'

import { Select } from 'antd'

const { Option } = Select

export default function ChartTypeSelect ({ onChange, defaultValue }) {
  return (
        <Select
            defaultValue={defaultValue}
            className='chart-type-select'
            onChange={onChange}
        >
            <Option value='T'> <TableOutlined/> Table </Option>
            <Option value='L'> <LineChartOutlined/> Line Chart</Option>

        </Select>
  )
}