import { Component, OnInit } from '@angular/core';

declare var $: any; // Declarar jQuery para su uso

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
  customers: any[] = [];
  newCustomer: any = {
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
      success: (data: any) => {
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
      success: (data: any) => {
        console.log('Cliente agregado:', data);
        alert('Cliente agregado exitosamente');
        this.getCustomers(); // Recargar la lista
      },
      error: (err: any) => {
        console.error('Error al agregar cliente:', err);
        alert('Error al agregar cliente');
      }
    });
  }

  deleteCustomer(id: number) {
    $.ajax({
      url: `http://localhost:8000/api/customers/${id}`,
      type: 'DELETE',
      success: () => {
        console.log('Cliente eliminado');
        alert('Cliente eliminado exitosamente');
        this.getCustomers(); // Recargar la lista
      },
      error: (err: any) => {
        console.error('Error al eliminar cliente:', err);
        alert('Error al eliminar cliente');
      }
    });
  }
}
