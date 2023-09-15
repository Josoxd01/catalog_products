using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ProductBackend.Models
{
  public class Producto
  {
    public int Id { get; set; }
    [Required]
    public string Nombre { get; set; }
    [Required]
    public float precio { get; set; }
    [Required]
    public string Descripcion { get; set; }

  }
}
