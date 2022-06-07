import React, {useEffect, useState} from "react";

import { handleAPITable } from "../helper/handler";

import { Table as AntdTable } from "antd";

export default function Table() {

    const [resultData, setResultData] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        handleAPITable({year: 2021}, {setResultData, setLoading})
    },[])

    return (
        
        <AntdTable
            columns={resultData?.columns}
            dataSource={resultData?.dataSource}
            loading={loading}
            pagination={false}
            size='small'
        />
    )
}