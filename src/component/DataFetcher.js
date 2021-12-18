import React, { useEffect, useState} from 'react';
import axios from 'axios';
import { Select } from 'antd';

const { Option } = Select;

export default function DataFetcher() {

    const [allData, setAllData] = useState('');
    const [year, setYear] = useState('2021');

    const fetchData = () => {
        axios.get(`http://ergast.com/api/f1/${year}/drivers`)
            .then(res => { setAllData(JSON.stringify(res)) })
    }

    useEffect(() =>{
        fetchData();
    },[year])

    return (
        <>
             <Select
                showSearch
                placeholder="Select a person"
                optionFilterProp="children"
                onChange={(val) => {setYear(val)}}
                filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
            >
                <Option value="2019">2019</Option>
                <Option value="2020">2020</Option>
                <Option value="2021">2021</Option>
            </Select>
            <p>{allData}</p>
        </>
    )
}