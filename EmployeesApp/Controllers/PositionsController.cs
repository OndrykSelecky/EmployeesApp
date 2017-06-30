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
    public class PositionsController : ApiController
    {
        private EmployeesAppContext db = new EmployeesAppContext();

        // GET: api/Positions
        public IQueryable<Position> GetPositions()
        {
            
            return db.Positions;
        }

        // GET: api/Positions/5
        [ResponseType(typeof(Position))]
        public async Task<IHttpActionResult> GetPosition(int id)
        {
            Position position = await db.Positions.FindAsync(id);
            if (position == null)
            {
                return NotFound();
            }

            return Ok(position);
        }

        [HttpGet]
        [ResponseType(typeof(PositionDTO))]
        public async Task<IHttpActionResult> GetByEmployee(int employeeID)
        {
            var query = from p in db.Positions
                        where p.EmployeeID == employeeID
                        orderby p.StartDate descending
                        select new PositionDTO
                        {
                            ID = p.ID,
                            StartDate = p.StartDate,
                            PositionTypeID = p.PositionType.ID,
                            PositionType = p.PositionType.Name,
                            EmployeeID = employeeID,
                        };

            var resultList = await query.ToListAsync();

            try
            {
                if (resultList.Count > 0)
                {
                    for (int i = 1; i < resultList.Count; i++)
                    {
                        resultList.ElementAt(i).EndDate = resultList.ElementAt(i - 1).StartDate;
                    }
                    resultList.ElementAt(0).EndDate = null;
                }
            }
            catch (NullReferenceException)
            {
                return NotFound();
            }

            return Ok(resultList);
        }

        // PUT: api/Positions/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutPosition(int id, Position position)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != position.ID)
            {
                return BadRequest();
            }

            db.Entry(position).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PositionExists(id))
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

        // POST: api/Positions
        [ResponseType(typeof(PositionDTO))]
        public async Task<IHttpActionResult> PostPosition(PositionDTO position)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Position newPosition = new Position();
            newPosition.EmployeeID = position.EmployeeID;
            newPosition.PositionTypeID = position.PositionTypeID;
            newPosition.StartDate = position.StartDate;

            db.Positions.Add(newPosition);
            await db.SaveChangesAsync();

            return CreatedAtRoute("DefaultApi", new { id = position.ID }, position);
        }

        // DELETE: api/Positions/5
        [ResponseType(typeof(Position))]
        public async Task<IHttpActionResult> DeletePosition(int id)
        {
            Position position = await db.Positions.FindAsync(id);
            if (position == null)
            {
                return NotFound();
            }

            db.Positions.Remove(position);
            await db.SaveChangesAsync();

            return Ok(position);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool PositionExists(int id)
        {
            return db.Positions.Count(e => e.ID == id) > 0;
        }
    }
}