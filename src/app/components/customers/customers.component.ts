import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Declarar jQuery
declare var $: any;

interface Customer {
  id?: number;
  nombre: string;
  apellido: string;
  domicilio: string;
  email: string;
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
    email: ''
  };

  ngOnInit() {
    this.getCustomers();
  }

  getCustomers() {
    $.ajax({
      url: 'http://localhost:8000/api/customers',
      type: 'GET',
      success: (data: Customer[]) => {
        this.customers = data;
        console.log('Clientes cargados:', this.customers);
      },
      error: (err: any) => {
        console.error('Error al obtener clientes:', err);
      }
    });
  }

  addCustomer() {
    $.ajax({
      url: 'http://localhost:8000/api/customers',
      type: 'POST',
      data: JSON.stringify(this.newCustomer),
      contentType: 'application/json',
      success: (data: Customer) => {
        console.log('Cliente agregado:', data);
        alert('Cliente agregado exitosamente');
        // Limpiar el formulario
        this.newCustomer = {
          nombre: '',
          apellido: '',
          domicilio: '',
          email: ''
        };
        this.getCustomers();
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
        url: `http://localhost:8000/api/customers/${id}`,
        type: 'DELETE',
        success: () => {
          console.log('Cliente eliminado');
          alert('Cliente eliminado exitosamente');
          this.getCustomers();
        },
        error: (err: any) => {
          console.error('Error al eliminar cliente:', err);
          alert('Error al eliminar cliente');
        }
      });
    }
  }
}