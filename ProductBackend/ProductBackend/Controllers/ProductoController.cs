using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProductBackend.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ProductBackend.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class ProductoController : ControllerBase
  {
    private readonly AplicationDbContext _context;
    public ProductoController(AplicationDbContext context)
    {
      _context = context;
    }
    // GET: api/<ProductoController>
    [HttpGet]
    public async Task<IActionResult> Get()
    {
      try
      {
        var listComentarios = await _context.Producto.ToListAsync();
        return Ok(listComentarios);
      }
      catch(Exception ex)
      {
        return BadRequest(ex.Message);
      }

    }


    // POST api/<ProductoController>
    [HttpPost]
    public async Task<IActionResult> Post([FromBody] Producto producto)
    {

      try
      {

        _context.Add(producto);
        await _context.SaveChangesAsync();

        return Ok(producto);

      }
      catch (Exception ex)
      {

        return BadRequest(ex.Message);
      }
    }

    // PUT api/<ProductoController>/5
    [HttpPut("{id}")]
    public async Task<IActionResult> Put(int id, [FromBody] Producto producto)
    {
      try
      {
        if (id != producto.Id)
        {
          return BadRequest();
        }

        _context.Update(producto);
        await _context.SaveChangesAsync();
        return Ok(new { message = "Producto actualizado con exito!" });

      }
      catch (Exception ex)
      {
        return BadRequest(ex.Message);
      }

    }

    // DELETE api/<ProductoController>/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
      try
      {

        var comentario = await _context.Producto.FindAsync(id);

        if (comentario == null)
        {
          return NotFound();
        }

        _context.Producto.Remove(comentario);
        await _context.SaveChangesAsync();
        return Ok(new { message = "Comentario eliminado con exito!" });

      }
      catch (Exception ex)
      {

        return BadRequest(ex.Message);
      }

    }
  }
}
