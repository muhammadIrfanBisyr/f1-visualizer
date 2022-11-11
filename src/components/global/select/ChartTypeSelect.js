import React from 'react'
import { TableOutlined, LineChartOutlined } from '@ant-design/icons'

import { Select } from 'antd'

const { Option } = Select

export default function ChartTypeSelect ({ onChange, defaultValue, width }) {
  return (
        <Select
            defaultValue={defaultValue}
            className='chart-type-select'
            onChange={onChange}
            {...(width && { style: { width } })}
        >
            <Option value='T'> <TableOutlined/> Table </Option>
            <Option value='L'> <LineChartOutlined/> Line Chart</Option>

        </Select>
  )
}
