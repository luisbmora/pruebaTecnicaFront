import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.css'],
  standalone: true, // Marca como standalone
  imports: [CommonModule, ReactiveFormsModule] // Importa módulos necesarios
})
export class CustomerFormComponent {
  @Input() customer: any;
  @Output() close = new EventEmitter<void>();
  customerForm: FormGroup;

  constructor(private fb: FormBuilder) {
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
    if (this.customer) {
      console.log('Actualizando cliente', this.customerForm.value);
    } else {
      console.log('Creando cliente', this.customerForm.value);
    }
    this.close.emit();
  }

  closeForm() {
    this.close.emit();
  }
}
