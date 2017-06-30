define(["require", "exports", 'durandal/system', 'knockout', 'durandal/app', '../services/positionService'], function (require, exports, system, ko, app, positionService_1) {
    "use strict";
    var positionTypes = (function () {
        function positionTypes() {
            var _this = this;
            this.activate = function () {
                return positionService_1.PositionService.getPositionTypes().done(function (data) {
                    system.log("Dáta: " + data);
                    _this.positions(data);
                }).fail(function () {
                    app.showMessage("Unable to get list of positions", "Error");
                });
            };
            this.positions = ko.observableArray();
        }
        ;
        return positionTypes;
    }());
    return positionTypes;
});
//# sourceMappingURL=positionTypes.js.map