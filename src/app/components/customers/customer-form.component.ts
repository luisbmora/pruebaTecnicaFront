import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';

interface Customer {
  id?: number;
  nombre: string;
  apellido: string;
  domicilio: string;
  email: string;
}

@Component({
  selector: 'app-customer-form',
  template: `
    <div class="customer-form-container">
      <form [formGroup]="customerForm" (ngSubmit)="onSubmit()">
        <div class="form-group">
          <label for="nombre">Nombre:</label>
          <input 
            id="nombre"
            type="text"
            formControlName="nombre">
          <div *ngIf="customerForm.get('nombre')?.errors?.['required'] && customerForm.get('nombre')?.touched" 
               class="error-message">
            El nombre es requerido
          </div>
        </div>

        <div class="form-group">
          <label for="apellido">Apellido:</label>
          <input 
            id="apellido"
            type="text"
            formControlName="apellido">
          <div *ngIf="customerForm.get('apellido')?.errors?.['required'] && customerForm.get('apellido')?.touched"
               class="error-message">
            El apellido es requerido
          </div>
        </div>

        <div class="form-group">
          <label for="domicilio">Domicilio:</label>
          <input 
            id="domicilio"
            type="text"
            formControlName="domicilio">
          <div *ngIf="customerForm.get('domicilio')?.errors?.['required'] && customerForm.get('domicilio')?.touched"
               class="error-message">
            El domicilio es requerido
          </div>
        </div>

        <div class="form-group">
          <label for="email">Email:</label>
          <input 
            id="email"
            type="email"
            formControlName="email">
          <div *ngIf="customerForm.get('email')?.errors?.['required'] && customerForm.get('email')?.touched"
               class="error-message">
            El email es requerido
          </div>
          <div *ngIf="customerForm.get('email')?.errors?.['email'] && customerForm.get('email')?.touched"
               class="error-message">
            El email no es válido
          </div>
        </div>

        <div class="button-group">
          <button type="submit" [disabled]="!customerForm.valid">
            {{ customer ? 'Actualizar' : 'Crear' }}
          </button>
          <button type="button" (click)="onClose()">Cancelar</button>
        </div>
      </form>
    </div>
  `,
  styleUrls: ['./customer-form.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class CustomerFormComponent implements OnInit {
  @Input() customer: Customer | null = null;
  @Output() closeEvent = new EventEmitter<void>();
  customerForm: FormGroup;

  constructor(private fb: FormBuilder, private apiService: ApiService) {
    this.customerForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      domicilio: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit() {
    if (this.customer) {
      this.customerForm.patchValue(this.customer);
    }
  }

  onSubmit() {
    if (this.customerForm.valid) {
      const token = localStorage.getItem('token') || '';
      
      if (this.customer?.id) {
        this.apiService.updateCustomer(this.customer.id, this.customerForm.value, token).subscribe({
          next: () => {
            this.closeEvent.emit();
          },
          error: (error) => {
            console.error('Error updating customer:', error);
          }
        });
      } else {
        this.apiService.createCustomer(this.customerForm.value, token).subscribe({
          next: () => {
            this.closeEvent.emit();
          },
          error: (error) => {
            console.error('Error creating customer:', error);
          }
        });
      }
    }
  }

  onClose() {
    this.closeEvent.emit();
  }
}