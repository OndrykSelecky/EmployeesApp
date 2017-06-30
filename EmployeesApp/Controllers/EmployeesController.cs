using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;
using Employees.Models;
using EmployeesApp.Models;

namespace EmployeesApp.Controllers
{
    public class EmployeesController : ApiController
    {
        private EmployeesAppContext db = new EmployeesAppContext();

        // GET: api/Employees
        public IQueryable<AllEmployeesDTO> GetEmployees()
        {
            //employee always has at least one position
            var query = from e in db.Employees
                        let p = db.Positions.Where(p2 => e.ID == p2.EmployeeID).OrderByDescending(x => x.StartDate).FirstOrDefault()
                        join pt in db.PositionTypes on p.PositionTypeID equals pt.ID
                        select new AllEmployeesDTO
                        {
                            ID = e.ID,
                            Name = e.FirstName + " " + e.LastName,
                            Position = pt.Name
                        };

            return query;
        }

        // GET: api/Employees/5
        [ResponseType(typeof(EmployeeDTO))]
        public async Task<IHttpActionResult> GetEmployee(int id)
        {
            var employeeQuery = from e in db.Employees
                                where e.ID == id
                                select new EmployeeDTO
                                {
                                    ID = e.ID,
                                    FirstName = e.FirstName,
                                    LastName = e.LastName,
                                    Address = e.Address,
                                    BirthDate = e.BirthDate,
                                    Salary = e.Salary,
                                };

            return Ok(await employeeQuery.FirstOrDefaultAsync());
        }

        // PUT: api/Employees/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutEmployee(int id, EmployeeDTO employee)
        {
            //validity checked by client
            if (!ModelState.IsValid)
            {                
                return BadRequest(ModelState);
            }

            if (id != employee.ID)
            {
                return BadRequest();
            }

            var originalEmployee = db.Employees.Find(id);
            originalEmployee.Address = employee.Address;
            originalEmployee.BirthDate = employee.BirthDate;
            originalEmployee.FirstName = employee.FirstName;
            originalEmployee.LastName = employee.LastName;
            originalEmployee.Salary = employee.Salary;


            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EmployeeExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Employees
        [ResponseType(typeof(Employee))]
        public async Task<IHttpActionResult> PostEmployee(EmployeeDTO employee)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Employee newEmployee = new Employee();
            newEmployee.Address = employee.Address;
            newEmployee.BirthDate = employee.BirthDate;
            newEmployee.FirstName = employee.FirstName;
            newEmployee.LastName = employee.LastName;
            newEmployee.Salary = employee.Salary;


            db.Employees.Add(newEmployee);
            await db.SaveChangesAsync();

            return CreatedAtRoute("DefaultApi", new { id = newEmployee.ID }, newEmployee);
        }

        // DELETE: api/Employees/5
        [ResponseType(typeof(Employee))]
        public async Task<IHttpActionResult> DeleteEmployee(int id)
        {
            Employee employee = await db.Employees.FindAsync(id);
            if (employee == null)
            {
                return NotFound();
            }

            db.Employees.Remove(employee);
            await db.SaveChangesAsync();

            return Ok(employee);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool EmployeeExists(int id)
        {
            return db.Employees.Count(e => e.ID == id) > 0;
        }
    }
}