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
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        render: (status) => 
            <div> 
                <RaceResultLogo name={status}/>
                {` ${status}`}
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
    },
    {
        title: 'Q2',
        dataIndex: 'q2',
        key: 'q2',
    },
    {
        title: 'Q3',
        dataIndex: 'q3',
        key: 'q3',
    },
];