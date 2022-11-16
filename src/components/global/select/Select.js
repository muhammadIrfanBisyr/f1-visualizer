import React from 'react'
import { Select as AntdSelect } from 'antd'

const { Option } = AntdSelect

export default function Select (props) {
  const options = props.options ?? []
  return (
    <AntdSelect
      {...props}
      {...(props?.width && { style: { width: props?.width } })}
    >
      {
        options.map((item) => (
          <Option
            key={item.value}
            value={item.value}
          >
            {item.icon} {item.label}
          </Option>
        ))
      }
    </AntdSelect>
  )
}
