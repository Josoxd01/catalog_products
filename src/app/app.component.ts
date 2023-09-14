import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

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

  ngOnInit(): void {
    debugger
    console.log(this.productos);
    const productosJSON = localStorage.getItem('productos');
    //this.productos = JSON.parse(productosJSON);
  }

  obtenerProductos(): Producto[] {
    return this.productos;
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
    this.nombre_producto = '';
    this.precio = 0;
    this.descripcion = '';
    this.guardarProductosEnLocalStorage();
  }

  actualizarProducto(id: any): void {
    debugger
    //const product = this.productos.find(v => v.id == id)

    for (let index = 0; index < this.productos.length; index++) {
      if (this.productos[index].id == id) {
        this.nombre_producto = this.productos[index].nombre
      }
    }
    //this.nombre_producto=product[0].nombre
    //console.log(product);


  }

  eliminarProducto(id: number): void {
    const index = this.productos.findIndex(p => p.id === id);
    if (index !== -1) {
      this.productos.splice(index, 1);
      this.guardarProductosEnLocalStorage();
    }
  }

  private guardarProductosEnLocalStorage(): void {
    debugger
    localStorage.setItem('productos', JSON.stringify(this.productos));
    console.log(this.productos);

  }

}

export interface Producto {
  id: number;
  nombre: string;
  precio: number;
  descripcion: string;
}