define(["require", "exports", 'durandal/system', 'plugins/router', 'durandal/app', 'knockout', '../models/PositionDTO', '../models/EmployeeDTO', '../services/employeeService', '../services/positionService'], function (require, exports, system, router, app, ko, PositionDTO_1, EmployeeDTO_1, employeeService_1, positionService_1) {
    "use strict";
    var Employee = (function () {
        function Employee() {
            var _this = this;
            this.activate = function (employeeID) {
                _this.isNew(employeeID > 0 ? false : true);
                if (_this.isNew())
                    return _this.initNewEmployee();
                else
                    return _this.initExistingEmployee(employeeID);
            };
            //Prepare view for adding new employee
            this.initNewEmployee = function () {
                return $.when(positionService_1.PositionService.getPositionTypes()).done(function (data) {
                    _this.positionTypes(data);
                    _this.selectedPosition(_this.positionTypes()[0]);
                    _this.employee = ko.observable(new EmployeeDTO_1.EmployeeDTO(0, "", "", "", _this.splitDate(new Date().toISOString()), 0));
                    var newPositions = [new PositionDTO_1.PositionDTO()];
                    _this.positions(newPositions);
                    _this.positions()[0].EndDate = _this.splitDate(new Date().toISOString());
                    _this.positions()[0].StartDate = _this.splitDate(new Date().toISOString());
                    _this.selectedPosition(_this.positionTypes()[0]);
                    system.log(_this.positions());
                });
            };
            this.initExistingEmployee = function (employeeID) {
                return $.when(employeeService_1.EmployeeService.getEmployee(employeeID), positionService_1.PositionService.getPositionTypes(), positionService_1.PositionService.getPositionsByEmployee(employeeID)).done(function (data1, data2, data3) {
                    //Set employee
                    var e = new EmployeeDTO_1.EmployeeDTO(data1[0].ID, data1[0].FirstName, data1[0].LastName, data1[0].Address, data1[0].BirthDate, data1[0].Salary);
                    _this.employee = ko.observable(e);
                    _this.employee().BirthDate(_this.splitDate(_this.employee().BirthDate()));
                    //Set position types
                    _this.positionTypes(data2[0]);
                    //set positions
                    _this.positions(data3[0]);
                    //edit format of date of positions
                    for (var i = 0; i < _this.positions().length; i++) {
                        _this.positions()[i].StartDate = _this.splitDate(_this.positions()[i].StartDate);
                        if (i == 0) {
                            _this.positions()[i].EndDate = _this.positions()[i].StartDate;
                        }
                        else {
                            _this.positions()[i].StartDate = _this.formatDate(_this.positions()[i].StartDate);
                            _this.positions()[i].EndDate = _this.splitDate(_this.positions()[i].EndDate);
                            _this.positions()[i].EndDate = _this.formatDate(_this.positions()[i].EndDate);
                        }
                    }
                    //set value of selected position type in <select> element
                    var actualPositionTypeID = _this.positions()[0].PositionTypeID;
                    for (var i = 0; i < _this.positionTypes().length; i++) {
                        if (_this.positionTypes()[i].ID == actualPositionTypeID) {
                            _this.selectedPosition(_this.positionTypes()[i]);
                            break;
                        }
                    }
                    system.log(_this.employee);
                }).fail(function () {
                    system.log("Error");
                    app.showMessage("Error");
                });
            };
            this.updateEmployee = function () {
                return employeeService_1.EmployeeService.putEmployee(_this.employee());
            };
            this.addEmployee = function () {
                return employeeService_1.EmployeeService.postEmployee(_this.employee()).done(function (data) {
                    _this.employee().ID = data.ID;
                    system.log(data);
                    system.log(_this.employee());
                    return _this.addPosition().done(function () {
                        app.showMessage("Employee added successfully");
                        router.navigate('#employeeList');
                    });
                });
            };
            this.addPosition = function () {
                //create new position
                var newPosition = new PositionDTO_1.PositionDTO();
                newPosition.EmployeeID = _this.employee().ID;
                newPosition.PositionType = _this.selectedPosition().Name;
                newPosition.PositionTypeID = _this.selectedPosition().ID;
                newPosition.StartDate = _this.positions()[0].EndDate;
                newPosition.EndDate = _this.positions()[0].EndDate;
                if (_this.isNew() == false) {
                    //format date
                    _this.positions()[0].StartDate = _this.formatDate(_this.positions()[0].StartDate);
                    _this.positions()[0].EndDate = _this.formatDate(_this.positions()[0].EndDate);
                    //add position at the beginning of list
                    _this.positions.reverse();
                    _this.positions.push(newPosition);
                    _this.positions.reverse();
                }
                //post
                return positionService_1.PositionService.postPosition(newPosition);
            };
            this.positionTypes = ko.observableArray();
            this.positions = ko.observableArray();
            this.selectedPosition = ko.observable();
            this.isNew = ko.observable();
        }
        //takes only first part from date (yyyy-MM-dd), so it can be displayed in <input type="date"> element
        Employee.prototype.splitDate = function (inputDate) {
            var arr = inputDate.split('T');
            return arr[0];
        };
        //changes date from yyyy-MM-dd to dd. MM. yyyy
        Employee.prototype.formatDate = function (inputDate) {
            var arr = inputDate.split('-');
            return arr[2] + '. ' + arr[1] + '. ' + arr[0];
        };
        return Employee;
    }());
    return Employee;
});
//# sourceMappingURL=employee.js.map