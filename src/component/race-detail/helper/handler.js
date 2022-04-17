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