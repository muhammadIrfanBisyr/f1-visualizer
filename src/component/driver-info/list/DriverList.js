import React, {useEffect, useState} from 'react';
import { List, Card } from 'antd';

import { handleAPIDriver } from '../helper/handler';

export default function DriverList(){

    const [driverData, setDriverData] = useState([]);
    const [year, setYear] = useState('2022');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        handleAPIDriver({year}, {setYear, setLoading, setDriverData});
    }, [])

    return (
        <List
            loading={loading}
            grid={{ gutter: 16, column: 4 }}
            dataSource={driverData}
            renderItem={(item) => (
                <List.Item>
                    <Card>
                        <div>{item?.driverId}</div>
                        <div>{item?.name}</div>
                        <div>{item?.nationality}</div>
                        <div>{item?.number}</div>
                    </Card>
                </List.Item>
            )}
        />
    )
}