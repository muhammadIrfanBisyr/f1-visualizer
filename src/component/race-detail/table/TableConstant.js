import {FallOutlined, RiseOutlined, MinusOutlined } from '@ant-design/icons';

import CountryFlag from '../../global/flag/CountryFlag';
import TeamLogo from "../../global/logo/TeamLogo";
import RaceResultLogo from "../../global/logo/RaceResultLogo";

export const RACE_COLUMN = [
    {
        title: 'Pos.',
        dataIndex: 'pos',
        key: 'pos',
    },
    {
        title: 'Grid',
        dataIndex: 'grid',
        key: 'grid',
        render: (grid) => 
        <div> 
            {grid === '0' ? 'Pit' : grid}
        </div>,
        sorter: (a, b) => a.grid - b.grid,
    },
    {
        title: 'No.',
        dataIndex: 'carNo',
        key: 'carNo',
    },
    {
        title: 'Driver Name',
        dataIndex: 'driver',
        key: 'driver',
        render: (driver, record) => 
            <div> 
                <CountryFlag name={record.nationality}/>
                {` ${driver}`}
            </div>
    },
    {
        title: 'Constructor',
        dataIndex: 'constructor',
        key: 'constructor',
        render: (constructor, record) => 
            <div> 
                <TeamLogo name={record.constructorId}/>
                {` ${constructor}`}
            </div>
        
    },
    {
        title: 'Laps',
        dataIndex: 'laps',
        key: 'laps',
    },
    {
        title: 'Time/Status',
        dataIndex: 'time',
        key: 'time',
        render: (time, record) => 
            <div> 
                <RaceResultLogo name={record.status}/>
                { time ? ` ${time}` : ` ${record.status}` }
            </div>
    },
    {
        title: 'Points',
        dataIndex: 'points',
        key: 'points',
        render: (points, record) => 
            <span>
                {
                    record.fastestLapRank === '1' && parseInt(record.year) >= 2019 ? 
                    `${parseInt(points)-1} + 1` : 
                    points 
                }
            </span>
    },
    {
        title: 'Changes',
        key: 'points',
        render: (_, record) => {
            const start = record.grid === '0' ? 20 : parseInt(record.grid);
            const changes = parseInt(record.pos) - start;
            return(
                <>
                    <span> 
                    {
                        changes < 0 ?
                        <RiseOutlined style={{'color': '#03fc2c'}}/> :
                        changes === 0 ?
                        <MinusOutlined /> :
                        <FallOutlined style={{'color': '#ff0000'}}/>
                    }
                    </span>
                    {` ${Math.abs(changes)}`}
                </>
            )
        }
       
    },
];

export const QUALIFYING_COLUMN = [
    {
        title: 'Pos.',
        dataIndex: 'pos',
        key: 'pos',
    },
    {
        title: 'No.',
        dataIndex: 'carNo',
        key: 'carNo',
    },
    {
        title: 'Driver Name',
        dataIndex: 'driver',
        key: 'driver',
        render: (driver, record) => 
            <div> 
                <CountryFlag name={record.nationality}/>
                {` ${driver}`}
            </div>
    },
    {
        title: 'Constructor',
        dataIndex: 'constructor',
        key: 'constructor',
        render: (constructor, record) => 
            <div> 
                <TeamLogo name={record.constructorId}/>
                {` ${constructor}`}
            </div>
        
    },
    {
        title: 'Q1',
        dataIndex: 'q1',
        key: 'q1',
        render: (q1, record) => 
        <span className={record?.fQ1 ? 'row-fastest-lap' : ''}> 
            {q1}
        </span>
    },
    {
        title: 'Q2',
        dataIndex: 'q2',
        key: 'q2',
        render: (q2, record) => 
        <span className={record?.fQ2 ? 'row-fastest-lap' : ''}> 
            {q2}
        </span>
    },
    {
        title: 'Q3',
        dataIndex: 'q3',
        key: 'q3',
        render: (q3, record) => 
        <span className={record?.fQ3 ? 'row-fastest-lap' : ''}> 
            {q3}
        </span>
    },
];