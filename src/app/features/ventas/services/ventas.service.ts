import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cliente } from '../../../shared/interfaces/cliente.interface';
import { Producto } from '../../../shared/interfaces/producto.interface';
import { Venta, VentaRequest } from '../../../shared/interfaces/venta.interface';

@Injectable({
  providedIn: 'root'
})
export class VentasService {

  private apiBaseUrl = 'http://localhost:8081/api';

  constructor(private http: HttpClient) { }

  getClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${this.apiBaseUrl}/clientes`);
  }

  getProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.apiBaseUrl}/productos`);
  }

  getVentas(): Observable<Venta[]> {
    return this.http.get<Venta[]>(`${this.apiBaseUrl}/ventas`);
  }

  registrarVenta(venta: VentaRequest): Observable<Venta> {
    return this.http.post<Venta>(`${this.apiBaseUrl}/ventas`, venta);
  }
}
