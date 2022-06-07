import CountryFlag from '../../global/flag/CountryFlag';

export const generateCountryColumn = (countryInitial, country) => ({
    key: countryInitial,
    title: () => (
        <div className='table-header-country'> 
            {` ${countryInitial}`}
            <CountryFlag country={country}/>
        </div>    
    ),
    dataIndex: countryInitial,
    render: (countryInitial) => {
        return (
            <div className='table-result' > 
                {countryInitial?.result}
            </div>
        )
    },
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