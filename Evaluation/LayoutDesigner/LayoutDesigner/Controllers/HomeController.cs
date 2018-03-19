using BuisnessLayer.Services;
using LayoutDesigner.Models;
using LayoutDesigner.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using BuisnessLayer.DTO;
using System.Text;

namespace LayoutDesigner.Controllers
{
    public class HomeController : Controller
    {
        private readonly IControlService _controlService = null;
        public HomeController(IControlService controlService)
        {
            this._controlService = controlService;
        }

        // GET: Home
        public ActionResult Index()
        {
            var controlList = GetControls();
            return View(controlList);
        }

        public ActionResult InsertControls(List<Control> controlList, List<Models.Attribute> attributeList)
        {
            //Assign contol list to dto list
            var dto =
                controlList.Select(x => new ControlDTO
                {
                    ControlId = x.ControlId,
                    Label = x.Label,
                    Type = x.Type,
                    IsVisible = x.IsVisible,
                    IsReadOnly = x.IsReadOnly,
                    Order = x.Order
                }).ToList();
            var attributedto = attributeList.Select(y => new AttributeDto
            {
                ControlId = y.ControlId,
                AttributeName = y.AttributeName,
                AttributeValue = y.AttributeValue
            }).ToList();
            _controlService.StoreControl(dto, attributedto);
            return RedirectToAction("DisplayControl", "Home");
        }

        public ActionResult DisplayControl()
        {
            var info = GetControls();
            return View(info);
        }

        [HttpPost]
        public ActionResult DisplayControl(FormCollection form)
        {
            var controlToShow = GetStoredControl();
            List<UserInput> summary = new List<UserInput>();
            foreach (var control in controlToShow)
            {
                if (control.IsVisible && !control.IsReadOnly)
                {
                    var input = new UserInput()
                    {
                        Label = control.Label,
                        Value = form[control.ControlId].ToString()

                    };
                    summary.Add(input);
                }
            }
            Session["summary"] = summary;
            return RedirectToAction("DisplayControl", "Home");
        }

        public ActionResult DisplaySummary()
        {
            try
            {
                var summary = (List<UserInput>)Session["summary"];
                if (!(summary.Count() == 0))
                    return PartialView("_Summary", summary);
            }
            catch (Exception message)
            {
                return Json(message.Message);
            }
            return Json("Submit form");
        }
        public ActionResult ShowData()
        {
            var summary = (List<UserInput>)Session["summary"];
            return View("ShowData", summary);
        }
        public ActionResult ClearLayout()
        {
            _controlService.ClearLayout();
            return RedirectToAction("Index");
        }

        /// <summary>
        /// Get Controls Data.
        /// </summary>
        /// <returns></returns>
        public List<Control> GetStoredControl()
        {
            var dto = _controlService.GetControlData();
            var controlToShow = dto.Select(x => new Control
            {
                ControlId = x.ControlId,
                Label = x.Label,
                Type = x.Type,
                IsVisible = x.IsVisible,
                IsReadOnly = x.IsReadOnly,
                Order = x.Order
            }).ToList();
            return controlToShow;
        }

        /// <summary>
        /// Get Controls Data.
        /// </summary>
        /// <returns></returns>
        public List<Models.Attribute> GetStoredControlAttributes()
        {
            var dto = _controlService.GetControlAttributeData();
            var attributeToShow = dto.Select(x => new Models.Attribute
            {
                ControlId = x.ControlId,
                AttributeName = x.AttributeName,
                AttributeValue = x.AttributeValue
            }).ToList();
            return attributeToShow;
        }

        /// <summary>
        /// Get Controls Data with attributes.
        /// </summary>
        /// <returns></returns>
        public List<ControlInfo> GetControls()
        {
            var controlToShow = GetStoredControl();
            var attribute = GetStoredControlAttributes();
            List<ControlInfo> info = new List<ControlInfo>();

            foreach (var control in controlToShow)
            {
                ControlInfo field = new ControlInfo();
                List<Models.Attribute> item = new List<Models.Attribute>();
                foreach (var feature in attribute)
                {
                    if (control.ControlId == feature.ControlId)
                    {
                        Models.Attribute attributeItem = new Models.Attribute();
                        attributeItem.AttributeName = feature.AttributeName;
                        attributeItem.AttributeValue = feature.AttributeValue;
                        item.Add(attributeItem);
                    }
                }
                field.ControlId = control.ControlId;
                field.Label = control.Label;
                field.Type = control.Type;
                field.IsVisible = control.IsVisible;
                field.IsReadOnly = control.IsReadOnly;
                field.Order = control.Order;
                field.ControlAttributes = item.ToList();
                info.Add(field);
            }

            return (info);
        }

    }
}