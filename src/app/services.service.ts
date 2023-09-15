import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class Productoservice {
    private myAppUrl = 'https://localhost:32768/';
    private myApiUrl = 'api/producto/'

    constructor(private http: HttpClient) { }

    getListProductos(): Observable<any> {
        return this.http.get(this.myAppUrl + this.myApiUrl);
    }

    deleteProducto(id: number): Observable<any> {
        return this.http.delete(this.myAppUrl + this.myApiUrl + id);
    }

    saveProducto(Producto: Producto): Observable<any> {
        return this.http.post(this.myAppUrl + this.myApiUrl, Producto);
    }



    updateProducto(id: number, producto: Producto): Observable<any> {
        return this.http.put(this.myAppUrl + this.myApiUrl + id, producto);
    }
}

export interface Producto {
    id: number;
    nombre: string;
    precio: number;
    descripcion: string;
}