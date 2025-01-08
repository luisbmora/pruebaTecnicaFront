import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import * as $ from 'jquery';

interface Customer {
  id?: number;
  nombre: string;
  apellido: string;
  domicilio: string;
  correo_electronico: string;
}

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class CustomersComponent implements OnInit {
  customers: Customer[] = [];
  newCustomer: Customer = {
    nombre: '',
    apellido: '',
    domicilio: '',
    correo_electronico: ''
  };

  private token: string | null = null;

  ngOnInit() {
    this.token = localStorage.getItem('authToken'); // Recuperar el token de localStorage
    if (!this.token) {
      alert('No se encontró el token. Redirigiendo al login.');
      window.location.href = '/login'; // Redirigir al login si no hay token
      return;
    }
    this.getCustomers();
  }

  getCustomers() {
    $.ajax({
      url: 'http://localhost:8000/api/direcciones',
      type: 'GET',
      headers: {
        Authorization: `Bearer ${this.token}` // Agregar el token al encabezado
      },
      success: (data: Customer[]) => {
        this.customers = data;
        console.log('Clientes cargados:', this.customers);
      },
      error: (err: any) => {
        console.error('Error al obtener clientes:', err);
        if (err.status === 401) {
          alert('Token expirado o inválido. Redirigiendo al login.');
          window.location.href = '/login'; // Redirigir al login si el token no es válido
        }
      }
    });
  }

  addCustomer() {
    $.ajax({
      url: 'http://localhost:8000/api/direcciones',
      type: 'POST',
      data: JSON.stringify(this.newCustomer),
      contentType: 'application/json',
      headers: {
        Authorization: `Bearer ${this.token}` // Agregar el token al encabezado
      },
      success: (data: Customer) => {
        console.log('Cliente agregado:', data);
        alert('Cliente agregado exitosamente');
        // Limpiar el formulario
        this.newCustomer = {
          nombre: '',
          apellido: '',
          domicilio: '',
          correo_electronico: ''
        };
        this.getCustomers(); // Recargar la lista de clientes
      },
      error: (err: any) => {
        console.error('Error al agregar cliente:', err);
        alert('Error al agregar cliente');
      }
    });
  }

  deleteCustomer(id: number) {
    if (confirm('¿Estás seguro de que quieres eliminar este cliente?')) {
      $.ajax({
        url: `http://localhost:8000/api/direcciones/${id}`,
        type: 'DELETE',
        headers: {
          Authorization: `Bearer ${this.token}` // Agregar el token al encabezado
        },
        success: () => {
          console.log('Cliente eliminado');
          alert('Cliente eliminado exitosamente');
          this.getCustomers(); // Recargar la lista de clientes
        },
        error: (err: any) => {
          console.error('Error al eliminar cliente:', err);
          alert('Error al eliminar cliente');
        }
      });
    }
  }
}
