using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace Employees.Models
{
    public class PositionDTO
    {
        public int ID { get; set; }

        [DataType(DataType.Date)]
        [Column(TypeName = "Date")]
        public DateTime StartDate { get; set; }

        [DataType(DataType.Date)]
        [Column(TypeName = "Date")]
        public DateTime? EndDate { get; set; }

        //public long? EndDate { get; set; }

        public int PositionTypeID { get; set; }
        public string PositionType { get; set; }

        public int EmployeeID { get; set; }

    }
}