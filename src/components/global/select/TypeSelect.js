import React from 'react'
import { Select } from 'antd'
import { UserOutlined, TeamOutlined } from '@ant-design/icons'

const { Option } = Select

export default function TypeSelect ({ onChange, defaultValue, width }) {
  return (
        <Select
          onChange={onChange}
          defaultValue={defaultValue}
          {...(width && { style: { width } })}
        >
            <Option value='D'><UserOutlined/> Driver</Option>
            <Option value='C'><TeamOutlined/> Constructor</Option>
        </Select>
  )
}
