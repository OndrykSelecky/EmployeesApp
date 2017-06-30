using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Employees.Models
{
    public class PositionType
    {
        
        public int ID { get; set; }

        [Required]
        public string Name { get; set; }

    }
}