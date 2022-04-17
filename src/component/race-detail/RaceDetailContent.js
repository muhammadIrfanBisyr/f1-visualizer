import React, {useState, useEffect, useContext} from 'react';
import { Space, message } from 'antd';
import axios from 'axios';

import RaceDetailContext from './context/RaceDetailContext';

import TableData from '../TableData';
import YearSelect from '../YearSelect';
import TrackSelect from '../TrackSelect';
import SessionSelect from '../SessionSelect';

import { apiToTableData, apiToTableDataQ } from '../../helper/utils'

export default function RaceDetailContent() {

    const {year, track, session} = useContext(RaceDetailContext);

    const [allData, setAllData] = useState('');
    const [isLoading, setLoading] = useState(false);

    useEffect(() =>{
        setLoading(true);
        if (session === 'R') {
            axios.get(`http://ergast.com/api/f1/${year}/${track}/results.json`)
                .then(res => {
                    try{
                        if(res.status === 200)
                            setAllData(apiToTableData(res));
                        else {
                            message('Error Fetching Data');
                        }
                    }
                    catch {
                        setAllData([]);
                    }
                    finally {
                        setLoading(false);
                    }
                })
        }
        else {
            axios.get(`http://ergast.com/api/f1/${year}/${track}/qualifying.json`)
            .then(res => {
                try{
                    if(res.status === 200) 
                        setAllData(apiToTableDataQ(res))
                    else {
                        message('Error Fetching Data');
                    }
                }
                catch {
                    setAllData([]);
                }
                finally {
                    setLoading(false);
                }
            })
        }
    },[year, track, session])

    return (
        <>
            <div className='main-table-container'>
                <TableData dataSource={allData.resData} columns={allData.resColumn} loading={isLoading}/>
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