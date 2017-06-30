
import { PositionDTO } from '../App/models/PositionDTO';
import ko = require('knockout');

export class EmployeeDTO {

    public constructor(ID: number, FirstName: string, LastName: string, Address: string, BirthDate: string, Salary: number) {
        this.ID = ID;
        this.FirstName = ko.observable<string>(FirstName);
        this.LastName = ko.observable<string>(LastName);
        this.Address = ko.observable<string>(Address);
        this.BirthDate = ko.observable<string>(BirthDate);
        this.Salary = ko.observable<number>(Salary);
    };
    
    

    public ID: number;

    public FirstName: KnockoutObservable<string>;

    public LastName: KnockoutObservable<string>;

    public Address: KnockoutObservable<string>;

    public BirthDate: KnockoutObservable<string>;

    public Salary: KnockoutObservable<number>;
    
}

