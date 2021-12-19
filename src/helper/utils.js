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
        },
        {
            title: 'Constructor',
            dataIndex: 'constructor',
            key: 'constructor',
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
        },
        {
            title: 'Points',
            dataIndex: 'points',
            key: 'points',
        },
    ];

    data.data.MRData.RaceTable.Races[0].Results.forEach((item) => {
        // console.log(item)
        resData.push(
            {
                pos: item.position,
                grid: item.grid,
                carNo: item.number,
                driver: `${item.Driver.givenName} ${item.Driver.familyName}`,
                constructor: item.Constructor.name,
                laps: item.laps,
                status: item.status,
                points: item.points,
            }
        )
    });

    // console.log(resData);
    return {resData, resColumn};
}