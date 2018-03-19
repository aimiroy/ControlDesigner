using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace LayoutDesigner.Models
{
    public class Control
    {
        [Key]
        public string ControlId { get; set; }

        [DataType(DataType.Text)]
        [StringLength(12)]
        public string Label { get; set; }

        [DataType(DataType.Text)]
        [StringLength(12)]
        public string Type { get; set; }

        public bool IsVisible { get; set; }

        public bool IsReadOnly { get; set; }

        public int Order { get; set; }

        [DataType(DataType.Text)]
        [StringLength(120)]
        public string Value { get; set; }

        public virtual ICollection<Attribute> ControlAttributes { get; set; }
    }
}