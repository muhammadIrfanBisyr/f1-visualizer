import { message } from 'antd';
import { RACE_COLUMN, QUALIFYING_COLUMN } from '../table/TableConstant';

import axios from 'axios';

const apiDataToTableData = (data, session) =>{
    const resData = [];

    if (session === 'R') {
        data.data.MRData.RaceTable.Races[0].Results.forEach((item) => {
            resData.push(
                {
                    pos: item.position,
                    grid: item.grid,
                    carNo: item.number,
                    driver: `${item.Driver.givenName} ${item.Driver.familyName}`,
                    driverId: item.Driver.driverId,
                    nationality: item.Driver.nationality,
                    constructor: item.Constructor.name,
                    constructorId: item.Constructor.constructorId,
                    laps: item.laps,
                    time: item?.Time?.time ?? '',
                    status: item.status,
                    points: item.points,
                    fastestLapRank: item?.FastestLap?.rank ?? '',
                }
            )
        });
    }
    else {
        
        // Warning: Lazy lap time comparison
        const fastestQ1 = ['99:99.999', -1];
        const fastestQ2 = ['99:99.999', -1];
        const fastestQ3 = ['99:99.999', -1];
    
        data.data.MRData.RaceTable.Races[0].QualifyingResults.forEach((item, index) => {

            if(item?.Q1 && item?.Q1 < fastestQ1[0]){
                fastestQ1[0] = item?.Q1;
                fastestQ1[1] = index;
            }
            
            if(item?.Q2 && item?.Q2 < fastestQ2[0]){
                fastestQ2[0] = item?.Q2;
                fastestQ2[1] = index;
            }

            if(item?.Q3 && item?.Q3 < fastestQ3[0]){
                fastestQ3[0] = item?.Q3;
                fastestQ3[1] = index;
            }

            resData.push(
                {
                    pos: item.position,
                    carNo: item.number,
                    driver: `${item.Driver.givenName} ${item.Driver.familyName}`,
                    nationality: item.Driver.nationality,
                    constructor: item.Constructor.name,
                    constructorId: item.Constructor.constructorId,
                    q1: item?.Q1 ?? '',
                    q2: item?.Q2 ?? '',
                    q3: item?.Q3 ?? '',
                }
            )
        });

        if(resData.length > 0){
            resData[fastestQ1[1]].fQ1 = fastestQ1[0];
            resData[fastestQ2[1]].fQ2 = fastestQ2[0];
            resData[fastestQ3[1]].fQ3 = fastestQ3[0];
        }
    }
    return {resData, column: session === 'R' ? RACE_COLUMN : QUALIFYING_COLUMN};
}

export const handleAPITable = (params, setters) => {

    const apiUrl = params.session === 'R' ?
                   `https://ergast.com/api/f1/${params.year}/${params.track}/results.json` :
                   `https://ergast.com/api/f1/${params.year}/${params.track}/qualifying.json`

    setters.setLoading(true);
    axios.get(apiUrl).then(res => {
        try {
            setters.setAllData(apiDataToTableData(res, params.session));
        }
        catch {
            setters.setAllData([]);
        }
        finally {
            setters.setLoading(false);
        }
    }).catch((err) => {
        setters.setAllData([]);
        message(`Error fetching API data: ${err}`);
    }).finally(() => {
        setters.setLoading(false)
    });
}

const apiToLineChartData = (data) => {
    const resData = [];

    data.data.MRData.RaceTable.Races[0].Laps.forEach((item) => {
        item.Timings.forEach((innerItem) => {
            resData.push({
                lapNo: parseInt(item.number),
                driverId: innerItem.driverId,
                pos: -parseInt(innerItem.position),
                time: innerItem.time
            });
        })
    })
    return resData;
}


const appendTableDataToLineData = (tableData, lineData) => {
    const res = [];
    const driverTable = {}

    tableData.forEach((item) => {
        const startGrid = item.grid === '0' ? -20 : -parseInt(item.grid);
        res.push({
            lapNo: 0,
            driverId: item.driverId,
            pos: startGrid,
            time: '00:00.000',
            constructorId: item.constructorId
        })
        driverTable[item.driverId] = item.constructorId;
    })

    return {chartData :res.concat(lineData), driverTable};
}

export const handleAPILineChart = (params, setters) => {

    const apiUrl = `https://ergast.com/api/f1/${params.year}/${params.track}/laps.json?limit=1500`;
    const apiUrlStart = `https://ergast.com/api/f1/${params.year}/${params.track}/results.json`;

    setters.setLoading(true);

    const requestLineData = axios.get(apiUrl);
    const requestTableData = axios.get(apiUrlStart);

    axios.all([requestLineData, requestTableData]).then(axios.spread((...responses) => {

        const resLine = responses[0];
        const resTable = responses[1];
        try {
            const processedTable = apiDataToTableData(resTable, 'R');
            const processedLine = apiToLineChartData(resLine);
            setters.setAllData(appendTableDataToLineData(processedTable.resData, processedLine));
        }
        catch (err) {
            setters.setAllData({});
        }
        finally{
            setters.setLoading(false);
        }
    })).catch((err) => {
        setters.setAllData({});
        message(`Error fetching API data: ${err}`);
    }).finally(() => {
        setters.setLoading(false);
    });
}