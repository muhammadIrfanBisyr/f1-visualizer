import CountryFlag from '../../global/flag/CountryFlag';
import { Link } from 'react-router-dom';

function RaceResultCell({result, status}){
    
    let className = 'table-result'

    if (status === 'Finished') {
        if(result === 1) className += ' table-result-first'
        else if (result === 2) className += ' table-result-second'
        else if (result === 3) className += ' table-result-third'
        else if (result >= 4 && result <= 10) className += ' table-result-points'
    }

    return(
        <div className={className}>
        {
            status === 'Finished' || status?.charAt(0) === '+' ? result : status && 'DNF'
        }
        </div>
    )
} 

export const generateCountryColumn = (countryInitialKey, country, year, round) => ({
    key: countryInitialKey,
    title: () => (
        <Link to={`../detail/${year}/${round}`}>
            <div className='table-header-country'> 
                <div>{countryInitialKey.split('_')[0]}</div>
                <CountryFlag country={country}/>
            </div>   
        </Link> 
    ),
    dataIndex: countryInitialKey,
    render: (countryInitialKey) => (
        <RaceResultCell result={countryInitialKey?.result} status={countryInitialKey?.status}/>
    )
});


export const DRIVER_COLUMN =  {
    key: 'driver',
    title: 'Driver Name',
    dataIndex: 'driverName',
    render: (driverName, record) => (
        <div> 
            <CountryFlag nationality={record.nationality}/>
            {` ${driverName}`}
        </div>
    ),
    width: 160
}

export const TOTAL_POINT_COLUMN =  {
    key: 'points',
    title: 'Points',
    dataIndex: 'points',
    render: (points) => (
        <div className='table-result'> 
            {points}
        </div>
    ),
    width: 50,
    sortOrder: 'descend',
    sorter: (a, b) => a.points - b.points,
}