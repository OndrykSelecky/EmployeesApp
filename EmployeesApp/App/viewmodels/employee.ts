
import system = require('durandal/system');
import router = require('plugins/router');
import app = require('durandal/app');
import ko = require('knockout');
import { PositionDTO }  from '../models/PositionDTO';
import { PositionType } from '../models/PositionType';
import { EmployeeDTO } from '../models/EmployeeDTO';
import { EmployeeService } from '../services/employeeService';
import { PositionService } from '../services/positionService';

class Employee {

    employee: KnockoutObservable<EmployeeDTO>;

    positionTypes: KnockoutObservableArray<PositionType>;

    positions: KnockoutObservableArray<PositionDTO>;

    selectedPosition: KnockoutObservable<PositionType>;

    isNew: KnockoutObservable<boolean>;


    constructor() {        
        this.positionTypes = ko.observableArray<PositionType>();
        this.positions = ko.observableArray<PositionDTO>();
        this.selectedPosition = ko.observable<PositionType>();
        this.isNew = ko.observable<boolean>();
    }


    activate = (employeeID: number) => {        
        this.isNew(employeeID > 0 ? false : true);

        if (this.isNew()) return this.initNewEmployee();
        else return this.initExistingEmployee(employeeID);
    }

    //Prepare view for adding new employee
    initNewEmployee = () => {
        return $.when(PositionService.getPositionTypes()).done(data => {

            this.positionTypes(data);                        
            this.selectedPosition(this.positionTypes()[0]);
                        
            this.employee = ko.observable<EmployeeDTO>(new EmployeeDTO(0, "", "", "", this.splitDate(new Date().toISOString()), 0));
            
            var newPositions: PositionDTO[] = [new PositionDTO()];
            this.positions(newPositions);
            this.positions()[0].EndDate = this.splitDate(new Date().toISOString());
            this.positions()[0].StartDate = this.splitDate(new Date().toISOString());

            this.selectedPosition(this.positionTypes()[0]);

            system.log(this.positions());
        });
    }


    initExistingEmployee = (employeeID: number) => {
        return $.when(
            EmployeeService.getEmployee(employeeID),
            PositionService.getPositionTypes(),
            PositionService.getPositionsByEmployee(employeeID)
        ).done((data1, data2, data3) => {

            //Set employee
            var e: EmployeeDTO = new EmployeeDTO(data1[0].ID, data1[0].FirstName, data1[0].LastName, data1[0].Address, data1[0].BirthDate, data1[0].Salary);
            this.employee = ko.observable<EmployeeDTO>(e);

            this.employee().BirthDate(this.splitDate(this.employee().BirthDate()));

            //Set position types
            this.positionTypes(data2[0]);

            //set positions
            this.positions(data3[0]);

            //edit format of date of positions
            for (var i: number = 0; i < this.positions().length; i++) {
                this.positions()[i].StartDate = this.splitDate(this.positions()[i].StartDate);

                if (i == 0) {
                    this.positions()[i].EndDate = this.positions()[i].StartDate;
                }
                else {
                    this.positions()[i].StartDate = this.formatDate(this.positions()[i].StartDate);
                    this.positions()[i].EndDate = this.splitDate(this.positions()[i].EndDate);
                    this.positions()[i].EndDate = this.formatDate(this.positions()[i].EndDate);
                }
            }

            //set value of selected position type in <select> element
            var actualPositionTypeID = this.positions()[0].PositionTypeID;
            for (var i = 0; i < this.positionTypes().length; i++) {
                if (this.positionTypes()[i].ID == actualPositionTypeID) {
                    this.selectedPosition(this.positionTypes()[i]);
                    break;
                }
            }

            system.log(this.employee);

            }).fail(() => {
                system.log("Error");
            app.showMessage("Error");
        });
    }


    updateEmployee = () => {
        return EmployeeService.putEmployee(this.employee());
    }


    addEmployee = () => {
        return EmployeeService.postEmployee(this.employee()
        ).done((data) => {
            this.employee().ID = data.ID;
            system.log(data);
            system.log(this.employee());
            
            return this.addPosition().done(() => {
                app.showMessage("Employee added successfully");
                router.navigate('#employeeList');
            });
        });
    }


    addPosition = () => {

        //create new position
        
        var newPosition: PositionDTO = new PositionDTO();
        newPosition.EmployeeID = this.employee().ID;
        newPosition.PositionType = this.selectedPosition().Name;
        newPosition.PositionTypeID = this.selectedPosition().ID;
        newPosition.StartDate = this.positions()[0].EndDate;
        newPosition.EndDate = this.positions()[0].EndDate;


        if (this.isNew() == false) {
            //format date
            this.positions()[0].StartDate = this.formatDate(this.positions()[0].StartDate);
            this.positions()[0].EndDate = this.formatDate(this.positions()[0].EndDate);
            
            //add position at the beginning of list
            this.positions.reverse();
            this.positions.push(newPosition);
            this.positions.reverse();
        }

        //post
        return PositionService.postPosition(newPosition);
    }

    //takes only first part from date (yyyy-MM-dd), so it can be displayed in <input type="date"> element
    splitDate(inputDate: string): string {
        var arr: string[] = inputDate.split('T');
        return arr[0];
    }

    //changes date from yyyy-MM-dd to dd. MM. yyyy
    formatDate(inputDate: string): string {
        var arr: string[] = inputDate.split('-');
        return arr[2] + '. ' + arr[1] + '. ' + arr[0];
    }
          

}

export = Employee;
 



