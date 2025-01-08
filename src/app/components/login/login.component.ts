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
  username: string = '';
  password: string = '';

  onSubmit() {
    const loginData = {
      username: this.username,
      password: this.password
    };

    // Crear nueva instancia de XMLHttpRequest
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:8000/api/login', true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    // Manejar la respuesta del servidor
    xhr.onload = () => {
      if (xhr.status === 200) {
        const response = JSON.parse(xhr.response); // Parsear la respuesta a JSON
        console.log('Login exitoso:', response);

        // Suponiendo que el token viene en la propiedad "token"
        const token = response.token;

        if (token) {
          // Guardar el token en localStorage
          localStorage.setItem('authToken', token);
          alert('Login exitoso');
          window.location.href = '/customers'; // Redirigir al CRUD de clientes
        } else {
          console.error('No se recibió un token en la respuesta.');
          alert('Error: No se recibió un token.');
        }
      } else {
        console.error('Error en el login:', xhr.response);
        alert('Error en el login');
      }
    };

    // Manejar errores de red
    xhr.onerror = () => {
      console.error('Error en el login:', xhr.response);
      alert('Error en el login');
    };

    // Enviar la solicitud con los datos del login
    xhr.send(JSON.stringify(loginData));
  }
}
