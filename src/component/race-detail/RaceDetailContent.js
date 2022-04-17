import React, {useState, useEffect, useContext} from 'react';
import { Space } from 'antd';

import RaceDetailContext from './context/RaceDetailContext';

import Table from './table/Table';
import YearSelect from '../YearSelect';
import TrackSelect from '../TrackSelect';
import SessionSelect from '../SessionSelect';

import { handleAPI } from './helper/handler';

export default function RaceDetailContent() {

    const {year, track, session} = useContext(RaceDetailContext);

    const [allData, setAllData] = useState([]);
    const [isLoading, setLoading] = useState(false);

    useEffect(() =>{
        handleAPI({session, track, year}, {setAllData, setLoading});
    },[year, track, session])

    return (
        <>
            <div className='main-table-container'>
                <Table dataSource={allData.resData} columns={allData.column} loading={isLoading}/>
            </div>

            <div className='main-select-group'>
                <Space>
                    <YearSelect />
                    <TrackSelect />
                    <SessionSelect/>
                </Space>
            </div>
        </>
    )
}