import { Component } from '@angular/core';

declare var $: any; // Declarar jQuery para su uso

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  onSubmit() {
    const loginData = {
      email: this.email,
      password: this.password
    };

    $.ajax({
      url: 'http://localhost:8000/api/login', // URL del backend
      type: 'POST',
      data: JSON.stringify(loginData),
      contentType: 'application/json',
      success: (response: any) => {
        console.log('Login exitoso:', response);
        alert('Login exitoso');
      },
      error: (err: any) => {
        console.error('Error en el login:', err);
        alert('Error en el login');
      }
    });
  }
}
