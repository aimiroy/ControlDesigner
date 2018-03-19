using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BuisnessLayer.DTO
{
    public class AttributeDto
    {
        [Key]
        public int AttributeId { get; set; }
        [DataType(DataType.Text)]
        [StringLength(12)]
        public string AttributeName { get; set; }
        [DataType(DataType.Text)]
        [StringLength(12)]
        public string AttributeValue { get; set; }
        public virtual ControlDTO Controls { get; set; }
        public string ControlId { get; set; }
    }
}
