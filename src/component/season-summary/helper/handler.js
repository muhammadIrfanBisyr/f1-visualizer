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

        const round =  item.round;
        const country =  item.Circuit.Location.country; 
        const year = item.season;

        const countryInitial = item?.raceName?.substring(0,3).toUpperCase() ?? '';
        resCol.push(generateCountryColumn(countryInitial, country, year, round))

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
                round,
                country
            }
        })
    })  

    return {columns: resCol, dataSource: Object.values(driverResults)};
}