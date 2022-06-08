import CountryFlag from '../../global/flag/CountryFlag';
import { Link } from 'react-router-dom';

export const generateCountryColumn = (countryInitial, country, year, round) => ({
    key: countryInitial,
    title: () => (
        <Link to={`../detail/${year}/${round}`}>
            <div className='table-header-country'> 
                <div>{countryInitial}</div>
                <CountryFlag country={country}/>
            </div>   
        </Link> 
    ),
    dataIndex: countryInitial,
    render: (countryInitial) => (
        <div className='table-result' > 
            {countryInitial?.result}
        </div>
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
    width: 150
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
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.points - b.points,
}