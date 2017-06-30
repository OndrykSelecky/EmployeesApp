

import system = require('durandal/system');
import ko = require('knockout');
import app = require('durandal/app');
import { PositionType } from '../models/PositionType';
import { PositionService } from '../services/positionService';

class positionTypes {
    positions: KnockoutObservableArray<PositionType>;

    constructor() {
        this.positions = ko.observableArray<PositionType>();
    };

    activate = () => {
        return PositionService.getPositionTypes().done(data => {
            system.log("Dáta: " + data);
            this.positions(data);
        }).fail(() => {
            app.showMessage("Unable to get list of positions", "Error");     
        });
    }

   
}

export = positionTypes;





