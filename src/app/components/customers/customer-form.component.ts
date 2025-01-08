import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-customer-form',
  templateUrl: '../customer-form/customer-form.component.html',
  styleUrls: ['./customer-form.component.css']
})
export class CustomerFormComponent implements OnInit {
  @Input() customer: any;
  @Output() close = new EventEmitter<void>();
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
    const token = localStorage.getItem('token') || '';
    if (this.customer) {
      this.apiService.updateCustomer(this.customer.id, this.customerForm.value, token).subscribe(() => {
        this.close.emit();
      });
    } else {
      this.apiService.createCustomer(this.customerForm.value, token).subscribe(() => {
        this.close.emit();
      });
    }
  }

  // close() {
  //   this.close.emit();
  // }
}