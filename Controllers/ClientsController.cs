using behavior_app.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace behavior_app.Controllers
{
    [ApiController]
    [Route("api/clients")]
    public class ClientsController : Controller
    {
        private BxDataContext _context;
        public ClientsController(BxDataContext context)
        {
            _context = context;
        }

        // GET: clients
        [HttpGet]
        public async Task<ActionResult<IEnumerable<MyClient>>> GetClients()
        {
            return await _context.Clients.ToListAsync();
        }
        // GET: clients/5
        [HttpGet("{id}")]
        public async Task<ActionResult<MyClient>> GetClient(int id)
        {
            var client = await _context.Clients.FindAsync(id);

            if (client == null)
                return NotFound();

            return client;
        }
        // GET: clients/5/notes
        [HttpGet("{id}/notes")]
        public async Task<ActionResult<IEnumerable<MyNote>>> GetClientNotes(int id)
        {
            var client = await _context.Clients.FindAsync(id);

            if (client == null)
                return NotFound();

            var notes = await _context.Notes
                .Where(x => x.ClientId == id)
                .OrderByDescending(x => x.Date)
                .ToListAsync();

            return notes;
        }

        // POST: clients
        [HttpPost]
        public async Task<ActionResult<MyClient>> PostClient(MyClient client)
        {
            var anyClient = await _context.Clients.AnyAsync();

            if (!anyClient)
                client.Number = 1;
            else
            {
                var lastClient = await _context.Clients.OrderBy(x => x.Number).LastAsync();
                client.Number = lastClient.Number + 1;
            }
            _context.Clients.Add(client);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetClient), new { id = client.Id }, client);
        }

        // PUT: clients/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutClient(int id, MyClient client)
        {
            if (id != client.Id)
                return BadRequest();

            _context.Entry(client).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.Clients.Any(c => c.Id == id))
                    return NotFound();
                throw;
            }

            return NoContent();
        }
        // DELETE: clients/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteClient(int id)
        {
            var client = await _context.Clients.FindAsync(id);

            if (client == null)
                return NotFound();

            _context.Clients.Remove(client);
            await _context.SaveChangesAsync();

            return NoContent();
        }

    }
}
