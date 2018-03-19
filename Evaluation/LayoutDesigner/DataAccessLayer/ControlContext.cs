using DataAccessLayer.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer
{
    public class ControlContext:DbContext
    {

        public ControlContext() : base(nameOrConnectionString: "ControlContext")
        {


        }
        
        
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.HasDefaultSchema("public");
            base.OnModelCreating(modelBuilder);
        }
        public DbSet<Control> controls { get; set; }
        public DbSet<Models.Attribute> attributes { get; set; }
    }
}
