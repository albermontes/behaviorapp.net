using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace behavior_app.Models
{
    public class BxDataContextInitializer
    {
        public static void Initialize(BxDataContext context)
        {
            context.Database.EnsureCreated();
        }
    }
}
