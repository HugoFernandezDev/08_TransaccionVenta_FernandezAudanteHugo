import { Cliente } from './cliente.interface';
import { Producto } from './producto.interface';

export interface VentaDetalle {
  id?: number;
  product: Producto;
  cantidad: number;
  precioUnitario: number;
  subtotal: number;
}

export interface Venta {
  id?: number;
  customer: Cliente;
  fecha: string;
  total: number;
  details: VentaDetalle[];
}

export interface VentaRequestDetalle {
  productoId: number;
  cantidad: number;
}

export interface VentaRequest {
  clienteId: number;
  detalles: VentaRequestDetalle[];
}
