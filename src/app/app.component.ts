import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Productoservice } from '../app/services.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'prueba_company';
  public productos: Producto[] = [];
  public nombre_producto: string = '';
  public id_producto: number = 0;
  public precio: number = 0;
  public descripcion: string = '';
  public edit_product: boolean = false;
  public edit_id: number = 0;
  public validate = false;

  ngOnInit(): void {
    debugger
    this.obtenerProductos();
    /* console.log(this.productos);
    const productosJSON = localStorage.getItem('productos');
    this.productos = JSON.parse(productosJSON); */
  }
  constructor(private _productoService: Productoservice) { }

  obtenerProductos() {
    debugger;
    this._productoService.getListProductos().subscribe(data => {
      this.productos = data;
      this.validate = true;

    }, error => {
      console.log(error);
    })
  }

  agregarProducto(): void {
    debugger
    let producto = {
      id: this.productos.length + 1,
      nombre: this.nombre_producto,
      precio: this.precio,
      descripcion: this.descripcion
    }
    this.productos.push(producto);
    if (this.validate) {
      this._productoService.saveProducto(producto).subscribe(data => {
        this.productos = data;
      }, error => {
        console.log(error);
      })
    } else {
      this.nombre_producto = '';
      this.precio = 0;
      this.descripcion = '';
    }

    //this.guardarProductosEnLocalStorage();

  }

  cargarProducto(id: any): void {

    const productoIndex = this.productos.findIndex((p) => p.id === id);
    if (productoIndex !== -1) {
      this.nombre_producto = this.productos[productoIndex].nombre;
      this.precio = this.productos[productoIndex].precio;
      this.descripcion = this.productos[productoIndex].descripcion;
      this.edit_id = this.productos[productoIndex].id;
      this.edit_product = true;
    }

  }
  ActualizarProducto(): void {
    debugger
    const productoIndex = this.productos.findIndex((p) => p.id === this.edit_id);

    if (productoIndex !== -1) {
      this.productos[productoIndex].nombre = this.nombre_producto;
      this.productos[productoIndex].descripcion = this.descripcion;
      this.productos[productoIndex].precio = this.precio;
      this.edit_product = false;
      this.edit_id = 0
      if (this.validate) {
        this._productoService.updateProducto(this.productos[productoIndex].id, this.productos[productoIndex]).subscribe(data => {
          this.productos = data;
        }, error => {
          console.log(error);
        })
      }
    }
    this.nombre_producto = '';
    this.precio = 0;
    this.descripcion = '';
  }

  eliminarProducto(id: number): void {
    const index = this.productos.findIndex(p => p.id === id);
    if (index !== -1) {
      this.productos.splice(index, 1);
      if (this.validate) {
        this._productoService.deleteProducto(id).subscribe(data => {
          this.productos = data;
        }, error => {
          console.log(error);
        })
      }
    }


  }

  /* private guardarProductosEnLocalStorage(): void {
    debugger
    localStorage.setItem('productos', JSON.stringify(this.productos));
    console.log(this.productos);

  } */

}

export interface Producto {
  id: number;
  nombre: string;
  precio: number;
  descripcion: string;
}