using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer.Models
{
    public class Attribute
    {
        [Key]
        public int AttributeId { get; set; }
        [DataType(DataType.Text)]
        [StringLength(12)]
        public string AttributeName { get; set; }
        [DataType(DataType.Text)]
        [StringLength(12)]
        public string AttributeValue { get; set; }
        public virtual Control Controls { get; set; }
        public string ControlId { get; set; }
    }
}
