import CountryFlag from "../../CountryFlag";
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
        </div>
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