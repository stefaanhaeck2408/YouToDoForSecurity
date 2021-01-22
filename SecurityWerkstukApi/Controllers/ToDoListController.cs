using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using SecurityWerkstukApi.Context;
using SecurityWerkstukApi.Models;
using System;
using System.Linq;
using System.Net;
using System.Net.Http;

namespace SecurityWerkstukApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("CorsPolicy")]

    public class ToDoListController : ControllerBase
    {
        private DataContext _datacontext;

        public ToDoListController(DataContext context)
        {
            _datacontext = context;
        }

        [HttpGet("private")]
        [Authorize]
        public IActionResult Private()
        {
            return Ok(new { Message = "Hello from a private endpoint! You need to be authenticated to see this" });
        }

        [HttpGet("private-scoped")]
        [Authorize("read:messages")]
        public IActionResult Scoped()
        {
            return Ok(new
            {
                Message = "Hello from a private endpoint! You need to be authenticated and have a scope of read:messages to see this."
            });
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

        [HttpGet]
        [Authorize]
        public IActionResult GetAll() {
            try
            {
                return Ok(_datacontext.ToDoLists.ToList());
            }
            catch  {
                return BadRequest();
            }
            
        }

        [HttpGet("{email}")]
        [Authorize]
        public IActionResult GetByEmail(string email)
        {
            try
            {
                var lists = _datacontext.ToDoLists.Where(x => x.EmailCreator == email).ToList();
                return Ok(lists);
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
                var entity = _datacontext.ToDoLists.Find(id);
                _datacontext.ToDoLists.Remove(entity);
                _datacontext.SaveChanges();
                return Ok();
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
                var viewmodel = JsonConvert.DeserializeObject<UpdateListViewModel>(json.ToString());
                ToDoList list = new ToDoList() { Id = viewmodel.Id, Name = viewmodel.Name, EmailCreator = viewmodel.EmailCreator };
                var response = _datacontext.ToDoLists.Update(list);
                _datacontext.SaveChanges();
                return Ok(response.Entity);
            }
            catch {
                return BadRequest();
            }
        }

        [HttpPost]
        [Authorize]
        public IActionResult Create(object json) {
            try
            {
                var viewmodel = JsonConvert.DeserializeObject<CreateListViewModel>(json.ToString());
                ToDoList list = new ToDoList() { Name = viewmodel.name, EmailCreator = viewmodel.EmailCreator };
                var response = _datacontext.ToDoLists.Add(list);
                _datacontext.SaveChanges();
                return Ok(response.Entity);
            }
            catch {
                return BadRequest();
            }
        }
    }
}
