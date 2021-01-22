using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SecurityWerkstukApi.Models
{
    [Route("api/[controller]")]
    [ApiController]
    public class CreateItemViewModel : ControllerBase
    {
        public string Name { get; set; }
        public int ListId { get; set; }
    }
}
