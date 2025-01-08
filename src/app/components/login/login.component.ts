import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  onSubmit() {
    const loginData = {
      email: this.email,
      password: this.password
    };

    // Crear nueva instancia de XMLHttpRequest
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:8000/', true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onload = () => {
      if (xhr.status === 200) {
        console.log('Login exitoso:', xhr.response);
        alert('Login exitoso');
        window.location.href = '/customers';
      } else {
        console.error('Error en el login:', xhr.response);
        alert('Error en el login');
      }
    };

    xhr.onerror = () => {
      console.error('Error en el login:', xhr.response);
      alert('Error en el login');
    };

    xhr.send(JSON.stringify(loginData));
  }
}