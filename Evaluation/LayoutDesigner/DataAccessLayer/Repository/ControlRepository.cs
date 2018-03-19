using DataAccessLayer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer.Repository
{
    public class ControlRepository : IControlRepository
    {
        /// <summary>
        /// Enter Controls data to database
        /// </summary>
        /// <param name="controlData"></param>
        /// <returns>void</returns>
        public void InsertControl(List<Control> controlData, List<Models.Attribute> attributes)
        {
            ClearLayout();

            using (ControlContext context = new ControlContext())
            {
                //Insert data to database
                context.controls.AddRange(controlData);
                context.attributes.AddRange(attributes);
                context.SaveChanges();
            }

        }

        /// <summary>
        /// Get the list of controls data from database
        /// </summary>
        /// <returns>List of controls</returns>
        public List<Control> GetControlData()
        {
            using (ControlContext context = new ControlContext())
            {
                var controlData = context.controls.ToList();
                return controlData;
            }
        }

        /// <summary>
        /// Get the list of control attribute data from database
        /// </summary>
        /// <returns>List of controls</returns>
        public List<Models.Attribute> GetControlAttributeData()
        {
            using (ControlContext context = new ControlContext())
            {
                var attributeData = context.attributes.ToList();
                return attributeData;
            }
        }

        /// <summary>
        ///Delete all control records in database. 
        /// </summary>
        public void ClearLayout()
        {
            using (ControlContext context = new ControlContext())
            {
                //Delete all records
                var itemsToDelete = context.Set<Control>();
                var itemAttributes= context.Set<Models.Attribute>();
                context.controls.RemoveRange(itemsToDelete);
                context.attributes.RemoveRange(itemAttributes);
                context.SaveChanges();
            }
        }
    }
}
