using LayoutDesigner.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace LayoutDesigner.ViewModel
{
    public class ControlInfo
    {
        public List<Models.Attribute> ControlAttributes { get; set; }
        public string ControlId { get; set; }
        
        public string Label { get; set; }
        
        public string Type { get; set; }

        public bool IsVisible { get; set; }

        public bool IsReadOnly { get; set; }

        public int Order { get; set; }

        
        public string Value { get; set; }

       // public virtual ICollection<Attribute> ControlAttributes { get; set; }
    }
}