

import system = require('durandal/system');
import router = require('plugins/router');
import app = require('durandal/app');
import ko = require('knockout');
import { AllEmployeesDTO } from '../models/AllEmployeesDTO';
import { EmployeeService } from '../services/employeeService';

class EmployeeList {

    employeeList: KnockoutObservableArray<AllEmployeesDTO>;

    selected: KnockoutObservable<number>;

    constructor() {
        this.employeeList = ko.observableArray<AllEmployeesDTO>();
        this.selected = ko.observable<number>();
    }

    activate = () => {
        return EmployeeService.getAllEmployees().done(data => {
                this.employeeList(data)
        });
    }

    details = (employee: AllEmployeesDTO) => {
        this.selected(employee.ID);
            router.navigate('#employee/' + employee.ID);
    }

    addEmployee = () => {
        router.navigate('#employee/0');
    }

    delete = (employee: AllEmployeesDTO) => {
        return app.showMessage("Do you really want to delete employee " + employee.Name + "?", "Delete employee", ['Yes', 'No']).done(answer => {
            if (answer == 'Yes') {
                return EmployeeService.deleteEmployee(employee).done(data => {
                    system.log("Dáta: " + data);
                    this.employeeList.remove(e => { return e.ID == employee.ID });
                });
            }
        });
    }
}

export = EmployeeList;

