import React from 'react'
import { TableOutlined, LineChartOutlined } from '@ant-design/icons'

import { Select } from 'antd'

const { Option } = Select

export const CHART_TYPE_OPTIONS = [
  { label: 'Table', value: 'T', icon: <TableOutlined/> },
  { label: 'Line Chart', value: 'L', icon: <LineChartOutlined/> }
]

export default function ChartTypeSelect (props) {
  const options = props?.options ?? CHART_TYPE_OPTIONS

  return (
    <Select
        className='chart-type-select'
        {...props}
        {...(props?.width && { style: { width: props?.width } })}
    >
        {options.map((item) => (
          <Option
            key={item.value}
            value={item.value}
          >
            {item.icon} {item.label}
          </Option>
        ))}
    </Select>
  )
}
