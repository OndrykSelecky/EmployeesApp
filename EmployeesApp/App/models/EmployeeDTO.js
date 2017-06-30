define(["require", "exports", 'knockout'], function (require, exports, ko) {
    "use strict";
    var EmployeeDTO = (function () {
        function EmployeeDTO(ID, FirstName, LastName, Address, BirthDate, Salary) {
            this.ID = ID;
            this.FirstName = ko.observable(FirstName);
            this.LastName = ko.observable(LastName);
            this.Address = ko.observable(Address);
            this.BirthDate = ko.observable(BirthDate);
            this.Salary = ko.observable(Salary);
        }
        ;
        return EmployeeDTO;
    }());
    exports.EmployeeDTO = EmployeeDTO;
});
//# sourceMappingURL=EmployeeDTO.js.map