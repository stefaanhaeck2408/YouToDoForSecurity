using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using SecurityWerkstukApi.Context;
using SecurityWerkstukApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Net;
using System.Net.Http;

namespace SecurityWerkstukApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("CorsPolicy")]
    public class ToDoItemsController : ControllerBase
    {
        private DataContext _datacontext;

        public ToDoItemsController(DataContext datacontext)
        {
            _datacontext = datacontext;
        }

        [AcceptVerbs("OPTIONS")]
        public HttpResponseMessage Options()
        {
            var resp = new HttpResponseMessage(HttpStatusCode.OK);
            resp.Headers.Add("Access-Control-Allow-Origin", "https://todo-securitywerkstuk.azurewebsites.net");
            resp.Headers.Add("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
            resp.Headers.Add("Access-Control-Allow-Headers", "Authorization, Content-Type");

            return resp;
        }

        [HttpGet("{id}")]
        [Authorize]
        public IActionResult GetById(int id)
        {
            try
            {
                return Ok(_datacontext.ToDoItems.Where(item => item.ToDoListId == id).ToList());

            }
            catch  {
                return BadRequest();
            }
        }

        [HttpPost]
        [Authorize]
        public IActionResult Create(object json)
        {
            try
            {
                var viewmodel = JsonConvert.DeserializeObject<CreateItemViewModel>(json.ToString());
                ToDoItem item = new ToDoItem() { Name = viewmodel.Name, ToDoListId = viewmodel.ListId };
                var response = _datacontext.ToDoItems.Add(item);
                _datacontext.SaveChanges();
                return Ok(response.Entity);
            }
            catch  {
                return BadRequest();
            }
            
        }
        
        [HttpPut]
        [Authorize]
        public IActionResult Update(object json)
        {
            try
            {
                var viewmodel = JsonConvert.DeserializeObject<UpdateListItemViewModel>(json.ToString());
                ToDoItem item = new ToDoItem() { Id = viewmodel.Id, Name = viewmodel.Name, Description = viewmodel.Description, ToDoListId = viewmodel.ListId };
                var response = _datacontext.ToDoItems.Update(item);
                _datacontext.SaveChanges();
                return Ok(response.Entity);
            }
            catch  {
                return BadRequest();            
            }
            
        }

        [HttpDelete("{id}")]
        [Authorize]
        public IActionResult Delete(int id) {
            try
            {
                var entity = _datacontext.ToDoItems.Find(id);
                _datacontext.ToDoItems.Remove(entity);
                _datacontext.SaveChanges();
                return Ok();
            }
            catch 
            {
                return BadRequest();
            }
            
        }
    }
}
