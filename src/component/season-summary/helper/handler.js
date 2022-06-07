import axios from "axios";
import { message } from 'antd';
import {generateCountryColumn, DRIVER_COLUMN} from '../table/TableConstant'

export const handleAPITable = (params, setters) => {

    const apiUrl = `https://ergast.com/api/f1/${params.year}/results.json?limit=500`;

    setters.setLoading(true);
    axios.get(apiUrl).then(res => {
        try {
            setters.setResultData(apiDataToTableData(res));
        }
        catch {
            setters.setResultData({});
        }
        finally {
            setters.setLoading(false);
        }
    }).catch((err) => {
        setters.setResultData({});
        message(`Error fetching API data: ${err}`);
    }).finally(() => {
        setters.setLoading(false)
    });
}

const apiDataToTableData = (data) => {

    const resCol = [DRIVER_COLUMN];
    const driverResults = {};
 
    data.data.MRData.RaceTable.Races.forEach((item) => {      
        
        const countryInitial = item?.raceName?.substring(0,3).toUpperCase() ?? '';
        resCol.push(generateCountryColumn(countryInitial, item.Circuit.Location.country))

        item.Results.forEach((resultItem) => {
            const driverId = resultItem.Driver.driverId;
            
            if (driverId in driverResults === false) {
                driverResults[driverId] = {
                    driverName: `${resultItem.Driver.givenName} ${resultItem.Driver.familyName}`,
                    nationality: resultItem.Driver.nationality
                }
            }

            driverResults[driverId][countryInitial] = {
                point: resultItem.points,
                result: resultItem.position,
                status: resultItem.status,
                round: item.round,
                country: item.Circuit.Location.country
            }
        })
    })  

    return {columns: resCol, dataSource: Object.values(driverResults)};
}