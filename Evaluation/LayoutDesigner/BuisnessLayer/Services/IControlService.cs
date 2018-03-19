using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BuisnessLayer.DTO;

namespace BuisnessLayer.Services
{
    public interface IControlService
    {
       void StoreControl(List<ControlDTO> controls, List<AttributeDto> attributes);
       List<ControlDTO> GetControlData();
       List<AttributeDto> GetControlAttributeData();
       void ClearLayout();
    }
}
