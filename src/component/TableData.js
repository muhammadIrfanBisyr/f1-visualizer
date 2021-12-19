import React from 'react';
import { Table } from 'antd';

export default function TableData({dataSource, columns}){
    return(
        <Table 
            dataSource={dataSource} 
            columns={columns}
            pagination={false}
        >

        </Table>
    )
}