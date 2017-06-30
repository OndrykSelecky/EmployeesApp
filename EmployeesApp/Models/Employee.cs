using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace Employees.Models
{
    public class Employee
    {

        public int ID { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Address { get; set; }

        [DataType(DataType.Date)]
        [Column(TypeName = "Date")]
        public DateTime BirthDate { get; set; }

        public double? Salary { get; set; }

        public ICollection<Position> Positions { get; set; }


    }
}