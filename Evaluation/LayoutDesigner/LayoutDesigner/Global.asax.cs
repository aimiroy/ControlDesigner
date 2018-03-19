using Autofac;
using Autofac.Integration.Mvc;
using BuisnessLayer.Services;
using DataAccessLayer;
using DataAccessLayer.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace LayoutDesigner
{
    public class MvcApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            RegisterAutofac();
        }
        private void RegisterAutofac()
        {
            var builder = new ContainerBuilder();
            builder.RegisterControllers(Assembly.GetExecutingAssembly());
            builder.RegisterSource(new ViewRegistrationSource());

            // manual registration of types;
            builder.RegisterType<ControlService>().As<IControlService>();
            builder.RegisterType<ControlRepository>().As<IControlRepository>();
            builder.RegisterType<ControlContext>();

            // For property injection using Autofac
            // builder.RegisterType<QuoteService>().PropertiesAutowired();


            var container = builder.Build();

            DependencyResolver.SetResolver(new AutofacDependencyResolver(container));




        }
    }
}
