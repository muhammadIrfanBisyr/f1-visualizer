import CountryFlag from '../../global/flag/CountryFlag';

export const generateCountryColumn = (countryInitial) => ({
    key: countryInitial,
    title: countryInitial,
    dataIndex: countryInitial,
    render: (countryInitial) => {
        return (
            <div> 
                {countryInitial?.result}
            </div>
        )
    }
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
    )
}