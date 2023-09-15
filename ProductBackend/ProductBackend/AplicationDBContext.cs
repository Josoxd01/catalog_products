using Microsoft.EntityFrameworkCore;
using ProductBackend.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProductBackend
{
  public class AplicationDbContext:DbContext
  {
    public DbSet<Producto> Producto { get; set; }

    public AplicationDbContext(DbContextOptions<AplicationDbContext> options) : base(options)
    {

    }
  }
}
