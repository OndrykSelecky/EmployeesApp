import { EmployeeDTO } from '../models/EmployeeDTO';
import { AllEmployeesDTO } from '../models/AllEmployeesDTO';

export class EmployeeService {

    public static getEmployee = (employeeID: number) => {
        return $.ajax(
            {
                type: "GET",
                url: '/api/Employees/' + employeeID,
                dataType: "json",
            })
    }

    public static putEmployee = (employee: EmployeeDTO) => {
        return $.ajax(
            {
                type: "PUT",
                url: '/api/Employees/' + employee.ID,
                dataType: 'JSON',
                data: employee,
                success: function (data, textStatus, jQxhr) {
                    console.log("**Success");
                },
                error: function (jqXhr, textStatus, errorThrown) {
                    console.log(errorThrown);
                }
            });
    }

    public static postEmployee = (employee: EmployeeDTO) => {
        return $.ajax(
            {
                type: "POST",
                url: '/api/Employees/',
                dataType: 'JSON',
                data: employee,
                success: function (data, textStatus, jQxhr) {
                    console.log("**Success");
                },
                error: function (jqXhr, textStatus, errorThrown) {
                    console.log(errorThrown);
                }
            });
    }

    public static getAllEmployees = () => {
        return $.ajax(
            {
                type: "GET",
                url: '/api/Employees',
                dataType: "json",
            });
    }

    public static deleteEmployee = (employee: AllEmployeesDTO) => {
        return $.ajax(
            {
                type: "DELETE",
                url: '/api/Employees/' + employee.ID,
                dataType: "json",
            });
    }

}