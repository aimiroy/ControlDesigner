using BuisnessLayer.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DataAccessLayer.Repository;
using DataAccessLayer.Models;

namespace BuisnessLayer.Services
{
    public class ControlService : IControlService
    {
        private readonly IControlRepository _repository;
        public ControlService(IControlRepository repository)
        {
            this._repository = repository;
        }

        /// <summary>
        /// Store list of controls data to database
        /// </summary>
        /// <param name="controls"></param>
        /// <returns>void</returns>
        public void StoreControl(List<ControlDTO> controls, List<AttributeDto> attributes)
        {
            //Assign contols list to controlData list
            var controlData =
                controls.Select(x => new Control
                {
                    ControlId = x.ControlId,
                    Label = x.Label,
                    Type = x.Type,
                    IsVisible = x.IsVisible,
                    IsReadOnly = x.IsReadOnly,
                    Order = x.Order
                }).ToList();
            var attributeData = attributes.Select(y => new DataAccessLayer.Models.Attribute
            {
                ControlId = y.ControlId,
                AttributeName = y.AttributeName,
                AttributeValue = y.AttributeValue
            }).ToList();
            _repository.InsertControl(controlData, attributeData);
        }

        /// <summary>
        /// Retrieve List of controls from database
        /// </summary>
        /// <returns>List of controls</returns>
        public List<ControlDTO> GetControlData()
        {

            var controlData = _repository.GetControlData().OrderBy(x => x.Order).ToList();

            //Assign controlData list to contols list.
            var controls = controlData.Select(data => new ControlDTO
            {
                ControlId = data.ControlId,
                Label = data.Label,
                Type = data.Type,
                IsVisible = data.IsVisible,
                IsReadOnly = data.IsReadOnly,
                Order = data.Order
            }).ToList();
            return controls;
        }

        /// <summary>
        /// Retrieve List of Attribute from database
        /// </summary>
        /// <returns>List of Attribute</returns>
        public List<AttributeDto> GetControlAttributeData()
        {
            var attributeData = _repository.GetControlAttributeData().ToList();

            //Assign attributeData list to attributes list.
            var attributes = attributeData.Select(data => new AttributeDto
            {
                ControlId = data.ControlId,
                AttributeName = data.AttributeName,
                AttributeValue = data.AttributeValue
            }).ToList();
            return attributes;
        }

        /// <summary>
        /// Clear currently stored control data
        /// </summary>
        public void ClearLayout()
        {
            _repository.ClearLayout();
        }
    }
}
