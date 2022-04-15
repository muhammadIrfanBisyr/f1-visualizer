import CountryFlag from "../component/CountryFlag";
import TeamLogo from "../component/global/logo/TeamLogo";
import RaceResultLogo from "../component/global/logo/RaceResultLogo";

export const apiToTableData = (data) =>{

    const resData = [];
    const resColumn = [
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

    data.data.MRData.RaceTable.Races[0].Results.forEach((item) => {
        resData.push(
            {
                pos: item.position,
                grid: item.grid,
                carNo: item.number,
                driver: `${item.Driver.givenName} ${item.Driver.familyName}`,
                nationality: item.Driver.nationality,
                constructor: item.Constructor.name,
                constructorId: item.Constructor.constructorId,
                laps: item.laps,
                status: item.status,
                points: item.points,
            }
        )
    });

    // console.log(resData);
    return {resData, resColumn};
}