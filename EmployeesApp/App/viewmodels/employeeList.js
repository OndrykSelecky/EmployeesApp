define(["require", "exports", 'durandal/system', 'plugins/router', 'durandal/app', 'knockout', '../services/employeeService'], function (require, exports, system, router, app, ko, employeeService_1) {
    "use strict";
    var EmployeeList = (function () {
        function EmployeeList() {
            var _this = this;
            this.activate = function () {
                return employeeService_1.EmployeeService.getAllEmployees().done(function (data) {
                    _this.employeeList(data);
                });
            };
            this.details = function (employee) {
                _this.selected(employee.ID);
                router.navigate('#employee/' + employee.ID);
            };
            this.addEmployee = function () {
                router.navigate('#employee/0');
            };
            this.delete = function (employee) {
                return app.showMessage("Do you really want to delete employee " + employee.Name + "?", "Delete employee", ['Yes', 'No']).done(function (answer) {
                    if (answer == 'Yes') {
                        return employeeService_1.EmployeeService.deleteEmployee(employee).done(function (data) {
                            system.log("Dáta: " + data);
                            _this.employeeList.remove(function (e) { return e.ID == employee.ID; });
                        });
                    }
                });
            };
            this.employeeList = ko.observableArray();
            this.selected = ko.observable();
        }
        return EmployeeList;
    }());
    return EmployeeList;
});
//# sourceMappingURL=employeeList.js.map