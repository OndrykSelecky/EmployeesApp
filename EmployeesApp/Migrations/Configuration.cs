namespace EmployeesApp.Migrations
{
    using Employees.Models;
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<EmployeesApp.Models.EmployeesAppContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(EmployeesApp.Models.EmployeesAppContext context)
        {
            context.PositionTypes.AddOrUpdate(x => x.ID,
               new PositionType() { ID = 1, Name = "Tester" },
               new PositionType() { ID = 2, Name = "Programátor" },
               new PositionType() { ID = 3, Name = "Support" },
               new PositionType() { ID = 4, Name = "Analytik" },
               new PositionType() { ID = 5, Name = "Obchodník" },
               new PositionType() { ID = 6, Name = "Iné" }
               );

            context.Positions.AddOrUpdate(x => x.ID,
                new Position() { ID = 1, StartDate = new DateTime(2015, 3, 1), EmployeeID = 1, PositionTypeID = 2 },
                new Position() { ID = 2, StartDate = new DateTime(2016, 7, 15), EmployeeID = 1, PositionTypeID = 6 },
                new Position() { ID = 3, StartDate = new DateTime(2016, 7, 14), EmployeeID = 1, PositionTypeID = 3 },
                new Position() { ID = 4, StartDate = new DateTime(2014, 12, 1), EmployeeID = 2, PositionTypeID = 1 }
                );

            context.Employees.AddOrUpdate(x => x.ID,
                new Employee() { ID = 1, FirstName = "Ondrej", LastName = "Prvý", Address = "Thurzu 4", BirthDate = new DateTime(1995, 7, 14), Salary = 1200 },
                new Employee() { ID = 2, FirstName = "Jozef", LastName = "Druhý", Address = "Koburkova 28", BirthDate = new DateTime(1990, 11, 28), Salary = 1300 }
                );
        }
    }
}
