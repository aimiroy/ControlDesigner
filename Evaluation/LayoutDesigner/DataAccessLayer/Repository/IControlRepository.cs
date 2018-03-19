using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DataAccessLayer.Models;

namespace DataAccessLayer.Repository
{
    public interface IControlRepository
    {
        void InsertControl(List<Control> controlData, List<Models.Attribute> attributes);
        void ClearLayout();
        List<Control> GetControlData();
        List<Models.Attribute> GetControlAttributeData();
    }
}
