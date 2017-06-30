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
    public class PositionTypesController : ApiController
    {
        private EmployeesAppContext db = new EmployeesAppContext();

        // GET: api/PositionTypes
        public IQueryable<PositionType> GetPositionTypes()
        {
            return db.PositionTypes;
        }

        // GET: api/PositionTypes/5
        [ResponseType(typeof(PositionType))]
        public async Task<IHttpActionResult> GetPositionType(int id)
        {
            PositionType positionType = await db.PositionTypes.FindAsync(id);
            if (positionType == null)
            {
                return NotFound();
            }

            return Ok(positionType);
        }

        // PUT: api/PositionTypes/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutPositionType(int id, PositionType positionType)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != positionType.ID)
            {
                return BadRequest();
            }

            db.Entry(positionType).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PositionTypeExists(id))
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

        // POST: api/PositionTypes
        [ResponseType(typeof(PositionType))]
        public async Task<IHttpActionResult> PostPositionType(PositionType positionType)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.PositionTypes.Add(positionType);
            await db.SaveChangesAsync();

            return CreatedAtRoute("DefaultApi", new { id = positionType.ID }, positionType);
        }

        // DELETE: api/PositionTypes/5
        [ResponseType(typeof(PositionType))]
        public async Task<IHttpActionResult> DeletePositionType(int id)
        {
            PositionType positionType = await db.PositionTypes.FindAsync(id);
            if (positionType == null)
            {
                return NotFound();
            }

            db.PositionTypes.Remove(positionType);
            await db.SaveChangesAsync();

            return Ok(positionType);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool PositionTypeExists(int id)
        {
            return db.PositionTypes.Count(e => e.ID == id) > 0;
        }
    }
}