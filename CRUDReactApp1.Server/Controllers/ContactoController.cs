using CRUDReactApp1.Server.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CRUDReactApp1.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContactoController : ControllerBase
    {
        private readonly CrudreactMvcContext _context;

        public ContactoController(CrudreactMvcContext context)
        {
            _context = context;
        }


        [HttpGet("/api/contacto/lista")]
        //[Route("GetContactos")]
        public async Task<ActionResult> Lista()
        {
            var lista = await _context.Contactos.OrderByDescending(c => c.IdContacto).ToListAsync();
            return StatusCode(StatusCodes.Status200OK, lista);
        }

        [HttpPost("/api/contacto/guardar")]
        //[Route("guardar")]
        public async Task<ActionResult> Guardar([FromBody] Contacto request)
        {
            await _context.Contactos.AddAsync(request);
            await _context.SaveChangesAsync();
            return StatusCode(StatusCodes.Status201Created);
        }

        [HttpPut("/api/contacto/editar")]
        //[Route("editar")]
        public async Task<ActionResult> Editar([FromBody] Contacto request)
        {
            _context.Contactos.Update(request);
            await _context.SaveChangesAsync();
            return StatusCode(StatusCodes.Status200OK);
        }

        [HttpDelete("/api/contacto/eliminar/{id:int}")]
        //[Route("eliminar/{id:int}")]
        public async Task<ActionResult> Eliminar(int id)
        {
            var contacto = _context.Contactos.FirstOrDefault(c => c.IdContacto == id);

            if (contacto != null)
            {
                _context.Remove(contacto);
                await _context.SaveChangesAsync();
                return StatusCode(StatusCodes.Status200OK);
            }
            else
            {
                return StatusCode(StatusCodes.Status404NotFound);
            }
        }
    }
}

