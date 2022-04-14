import React, {useState, useEffect} from 'react';
import { Typography, message, Space } from 'antd';
import axios from 'axios';

import YearSelect from '../component/YearSelect';
import TrackSelect from '../component/TrackSelect';
import TableData from '../component/TableData';

import { apiToTableData } from '../helper/utils';
import '../style/index.css';

const { Title } = Typography;

export default function MainPage(){

    const [year, setYear] = useState('2022');
    const [track, setTrack] = useState('1');

    const [allData, setAllData] = useState('');

    const [isLoading, setLoading] = useState(false);

    useEffect(() =>{
        setLoading(true);
        axios.get(`http://ergast.com/api/f1/${year}/${track}/results.json`)
            .then(res => {
                if(res.status === 200)
                    setAllData(apiToTableData(res));
                else{
                    message('Error Fetching Data');
                }
                setLoading(false);
            })
    },[year, track])

    return(
        <>
            <Title>
                F1 Visualizer
            </Title>

            <div className='main-table-container'>
                <TableData dataSource={allData.resData} columns={allData.resColumn} loading={isLoading}/>
            </div>

            <div className='main-select-group'>
                <Space>
                    <YearSelect year={year} setYear={setYear} setTrack={setTrack}/>
                    <TrackSelect year={year} track={track} setTrack={setTrack}/>
                </Space>
            </div>
        </>
    )
}