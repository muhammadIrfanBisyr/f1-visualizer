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
                    nationality: item.Driver.nationality,
                    constructor: item.Constructor.name,
                    constructorId: item.Constructor.constructorId,
                    laps: item.laps,
                    status: item.status,
                    points: item.points,
                }
            )
        });
    }
    else {
        data.data.MRData.RaceTable.Races[0].QualifyingResults.forEach((item) => {
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
    }
    return {resData, column: session === 'R' ? RACE_COLUMN : QUALIFYING_COLUMN};
}

export const handleAPI = (params, setters) => {

    const apiUrl = params.session === 'R' ?
                   `http://ergast.com/api/f1/${params.year}/${params.track}/results.json` :
                   `http://ergast.com/api/f1/${params.year}/${params.track}/qualifying.json`

    setters.setLoading(true);
    axios.get(apiUrl).then(res => {
        try{
            if(res.status === 200)
                setters.setAllData(apiDataToTableData(res, params.session));
            else {
                message('Error Fetching Data');
            }
        }
        catch {
            setters.setAllData([]);
        }
        finally {
            setters.setLoading(false);
        }
    })
}