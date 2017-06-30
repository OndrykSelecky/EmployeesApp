namespace EmployeesApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class initial : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Employees",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        FirstName = c.String(),
                        LastName = c.String(),
                        Address = c.String(),
                        BirthDate = c.DateTime(nullable: false, storeType: "date"),
                        Salary = c.Double(),
                    })
                .PrimaryKey(t => t.ID);
            
            CreateTable(
                "dbo.Positions",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        StartDate = c.DateTime(nullable: false, storeType: "date"),
                        PositionTypeID = c.Int(nullable: false),
                        EmployeeID = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.ID)
                .ForeignKey("dbo.Employees", t => t.EmployeeID, cascadeDelete: true)
                .ForeignKey("dbo.PositionTypes", t => t.PositionTypeID, cascadeDelete: true)
                .Index(t => t.PositionTypeID)
                .Index(t => t.EmployeeID);
            
            CreateTable(
                "dbo.PositionTypes",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        Name = c.String(nullable: false),
                    })
                .PrimaryKey(t => t.ID);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Positions", "PositionTypeID", "dbo.PositionTypes");
            DropForeignKey("dbo.Positions", "EmployeeID", "dbo.Employees");
            DropIndex("dbo.Positions", new[] { "EmployeeID" });
            DropIndex("dbo.Positions", new[] { "PositionTypeID" });
            DropTable("dbo.PositionTypes");
            DropTable("dbo.Positions");
            DropTable("dbo.Employees");
        }
    }
}
