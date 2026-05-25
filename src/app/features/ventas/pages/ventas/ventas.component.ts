import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Cliente } from '../../../../shared/interfaces/cliente.interface';
import { Producto } from '../../../../shared/interfaces/producto.interface';
import { Venta, VentaRequest, VentaRequestDetalle } from '../../../../shared/interfaces/venta.interface';
import { VentasService } from '../../services/ventas.service';

interface DetalleLocal {
  productoId: number;
  nombre: string;
  precio: number;
  cantidad: number;
  subtotal: number;
}

@Component({
  selector: 'app-ventas',
  standalone: false,
  templateUrl: './ventas.component.html',
  styleUrl: './ventas.component.css'
})
export class VentasComponent implements OnInit {
  // Datos cargados del API
  clientes: Cliente[] = [];
  productos: Producto[] = [];
  ventas: Venta[] = [];
  ventasFiltradas: Venta[] = [];

  // Pestaña activa: 'registro' | 'historial'
  activeTab: 'registro' | 'historial' = 'registro';

  // Formularios Reactivos
  ventaForm!: FormGroup;

  // Carrito local de productos
  detallesLocal: DetalleLocal[] = [];
  totalGeneral = 0;

  // Búsqueda en historial
  searchQuery = '';

  // Mensajes de Alerta/Estado
  successMessage = '';
  errorMessage = '';

  constructor(
    private service: VentasService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.initForm();
    this.loadData();
  }

  initForm() {
    this.ventaForm = this.fb.group({
      clienteId: ['', [Validators.required]],
      productoId: [''],
      cantidad: ['']
    });
  }

  loadData() {
    // Cargar Clientes
    this.service.getClientes().subscribe({
      next: (data) => this.clientes = data,
      error: (err) => console.error('Error cargando clientes', err)
    });

    // Cargar Productos
    this.service.getProductos().subscribe({
      next: (data) => this.productos = data,
      error: (err) => console.error('Error cargando productos', err)
    });

    // Cargar Historial de Ventas
    this.service.getVentas().subscribe({
      next: (data) => {
        this.ventas = data;
        this.filtrarVentas();
      },
      error: (err) => console.error('Error cargando ventas', err)
    });
  }

  // Cambiar pestaña activa
  setTab(tab: 'registro' | 'historial') {
    this.activeTab = tab;
    this.clearAlerts();
    if (tab === 'historial') {
      this.loadData(); // Recargar historial al entrar
    }
  }

  clearAlerts() {
    this.successMessage = '';
    this.errorMessage = '';
  }

  // Agregar producto seleccionado al carrito local
  agregarProducto() {
    this.clearAlerts();
    const productoIdVal = this.ventaForm.value.productoId;
    const cantidadVal = parseInt(this.ventaForm.value.cantidad, 10);

    // Validar selección de producto y cantidad
    if (!productoIdVal) {
      this.errorMessage = 'Debe seleccionar un producto.';
      return;
    }
    if (isNaN(cantidadVal) || cantidadVal <= 0) {
      this.errorMessage = 'La cantidad debe ser un número entero mayor a cero.';
      return;
    }

    // Buscar datos del producto
    const prod = this.productos.find(p => p.id === parseInt(productoIdVal, 10));
    if (!prod) {
      this.errorMessage = 'Producto seleccionado no válido.';
      return;
    }

    // Calcular cantidad total ya agregada en el carrito para este producto
    const yaAgregado = this.detallesLocal.find(d => d.productoId === prod.id);
    const cantidadExistente = yaAgregado ? yaAgregado.cantidad : 0;
    const cantidadNuevaTotal = cantidadExistente + cantidadVal;

    // Validación de stock local
    if (cantidadNuevaTotal > prod.stock) {
      this.errorMessage = `Stock insuficiente para "${prod.nombre}". Stock disponible: ${prod.stock}. Ya agregados en tabla: ${cantidadExistente}.`;
      return;
    }

    // Si ya existe en la tabla, actualizamos cantidad y subtotal
    if (yaAgregado) {
      yaAgregado.cantidad = cantidadNuevaTotal;
      yaAgregado.subtotal = yaAgregado.cantidad * yaAgregado.precio;
    } else {
      // Si no existe, agregamos nuevo detalle local
      const nuevoDetalle: DetalleLocal = {
        productoId: prod.id,
        nombre: prod.nombre,
        precio: prod.precio,
        cantidad: cantidadVal,
        subtotal: prod.precio * cantidadVal
      };
      this.detallesLocal.push(nuevoDetalle);
    }

    // Limpiar campos de selección de producto y cantidad
    this.ventaForm.patchValue({
      productoId: '',
      cantidad: ''
    });

    this.calcularTotal();
  }

  // Eliminar un producto del carrito local
  eliminarProducto(index: number) {
    this.detallesLocal.splice(index, 1);
    this.calcularTotal();
    this.clearAlerts();
  }

  // Calcular total acumulado de la venta actual
  calcularTotal() {
    this.totalGeneral = this.detallesLocal.reduce((sum, item) => sum + item.subtotal, 0);
  }

  // Registrar la venta en el backend
  registrarVenta() {
    this.clearAlerts();
    const clienteIdVal = this.ventaForm.value.clienteId;

    // Validar cliente obligatorio
    if (!clienteIdVal) {
      this.errorMessage = 'Debe seleccionar un cliente obligatorio.';
      return;
    }

    // Validar que el carrito no esté vacío
    if (this.detallesLocal.length === 0) {
      this.errorMessage = 'No puede registrar una venta vacía. Agregue al menos un producto a la tabla.';
      return;
    }

    // Construir payload de la venta
    const payloadDetalles: VentaRequestDetalle[] = this.detallesLocal.map(d => ({
      productoId: d.productoId,
      cantidad: d.cantidad
    }));

    const payload: VentaRequest = {
      clienteId: parseInt(clienteIdVal, 10),
      detalles: payloadDetalles
    };

    // Consumir API de registro de venta
    this.service.registrarVenta(payload).subscribe({
      next: (ventaCreada) => {
        this.successMessage = `¡Venta registrada con éxito! Folio Venta: #${ventaCreada.id}. Total: $${ventaCreada.total.toFixed(2)}`;
        this.detallesLocal = [];
        this.totalGeneral = 0;
        this.ventaForm.reset({
          clienteId: '',
          productoId: '',
          cantidad: ''
        });
        this.loadData(); // Recargar stocks, clientes e historial
      },
      error: (err) => {
        console.error('Error registrando venta', err);
        if (err.error && err.error.message) {
          this.errorMessage = err.error.message;
        } else {
          this.errorMessage = 'Ocurrió un error al registrar la venta. Por favor, intente de nuevo.';
        }
      }
    });
  }

  // Filtrar ventas por nombre de cliente en tiempo real
  filtrarVentas() {
    if (!this.searchQuery.trim()) {
      this.ventasFiltradas = this.ventas;
    } else {
      const q = this.searchQuery.toLowerCase();
      this.ventasFiltradas = this.ventas.filter(v => 
        v.customer.nombre.toLowerCase().includes(q) ||
        v.customer.documento.includes(q)
      );
    }
  }

  // Auxiliar para contar productos totales en una venta del historial
  contarProductos(venta: Venta): number {
    if (!venta.details) return 0;
    return venta.details.reduce((sum, item) => sum + item.cantidad, 0);
  }

  // Getters para validaciones visuales en HTML
  get clienteId() {
    return this.ventaForm.get('clienteId');
  }
}
