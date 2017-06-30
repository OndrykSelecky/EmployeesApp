define(["require", "exports"], function (require, exports) {
    "use strict";
    var EmployeeService = (function () {
        function EmployeeService() {
        }
        EmployeeService.getEmployee = function (employeeID) {
            return $.ajax({
                type: "GET",
                url: '/api/Employees/' + employeeID,
                dataType: "json",
            });
        };
        EmployeeService.putEmployee = function (employee) {
            return $.ajax({
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
        };
        EmployeeService.postEmployee = function (employee) {
            return $.ajax({
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
        };
        EmployeeService.getAllEmployees = function () {
            return $.ajax({
                type: "GET",
                url: '/api/Employees',
                dataType: "json",
            });
        };
        EmployeeService.deleteEmployee = function (employee) {
            return $.ajax({
                type: "DELETE",
                url: '/api/Employees/' + employee.ID,
                dataType: "json",
            });
        };
        return EmployeeService;
    }());
    exports.EmployeeService = EmployeeService;
});
//# sourceMappingURL=employeeService.js.map