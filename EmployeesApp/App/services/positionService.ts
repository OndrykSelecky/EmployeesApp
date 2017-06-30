import { PositionDTO }  from '../models/PositionDTO';

export class PositionService {

    public static getPositionTypes = () => {
        return $.ajax(
            {
                type: "GET",
                url: '/api/PositionTypes/',
                dataType: "json",
            });
    }

    public static getPositionsByEmployee = (employeeID: number) => {
        return $.ajax(
            {
                type: "GET",
                url: '/api/Positions?employeeID=' + employeeID,
                dataType: "json",
            });
    }

    public static postPosition = (position: PositionDTO) => {
        return $.ajax(
            {
                type: "POST",
                url: '/api/Positions/',
                dataType: 'JSON',
                data: position,
                success: function (data, textStatus, jQxhr) {
                    console.log("**Success");
                },
                error: function (jqXhr, textStatus, errorThrown) {
                    console.log(errorThrown);
                }
            });
    }

}




