define(["require", "exports"], function (require, exports) {
    "use strict";
    var PositionService = (function () {
        function PositionService() {
        }
        PositionService.getPositionTypes = function () {
            return $.ajax({
                type: "GET",
                url: '/api/PositionTypes/',
                dataType: "json",
            });
        };
        PositionService.getPositionsByEmployee = function (employeeID) {
            return $.ajax({
                type: "GET",
                url: '/api/Positions?employeeID=' + employeeID,
                dataType: "json",
            });
        };
        PositionService.postPosition = function (position) {
            return $.ajax({
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
        };
        return PositionService;
    }());
    exports.PositionService = PositionService;
});
//# sourceMappingURL=positionService.js.map