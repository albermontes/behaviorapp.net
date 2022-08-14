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
    [Route("api/notes")]
    public class NoteController : ControllerBase
    {
        private BxDataContext _context;
        public NoteController(BxDataContext context)
        {
            _context = context;
        }

        // GET: notes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<MyNote>>> GetNotes()
        {
            return await _context.Notes.ToListAsync();
        }
        // GET: notes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<MyNote>> GetNote(int id)
        {
            var note = await _context.Notes.FindAsync(id);

            if (note == null)
                return NotFound();

            return note;
        }

        // POST: notes
        [HttpPost]
        public async Task<ActionResult<MyNote>> PostNote(MyNote note)
        {
            var noteDb = await _context.Notes.FirstOrDefaultAsync(x => x.date == note.date);
            if(noteDb == null)
                _context.Notes.Add(note);
            else
                noteDb.jsonNote = note.jsonNote;

            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetNote), new { id = note.Id }, note);
        }
        // DELETE: notes/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteNote(int id)
        {
            var note = await _context.Notes.FindAsync(id);

            if (note == null)
                return NotFound();

            _context.Notes.Remove(note);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
