import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://127.0.0.1:8000'; // url del apiclient

  constructor(private http: HttpClient) {}

  /**
   * Login de usuario
   * @param email Email del usuario
   * @param password Contraseña del usuario
   */
  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, password });
  }

  /**
   * Obtener la lista de clientes
   * @param token Token de autenticación
   */
  getCustomers(token: string): Observable<any> {
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    return this.http.get(`${this.apiUrl}/customers`, { headers });
  }

  /**
   * Obtener un cliente por ID
   * @param id ID del cliente
   * @param token Token de autenticación
   */
  getCustomerById(id: number, token: string): Observable<any> {
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    return this.http.get(`${this.apiUrl}/customers/${id}`, { headers });
  }

  /**
   * Crear un nuevo cliente
   * @param customer Datos del cliente a crear
   * @param token Token de autenticación
   */
  createCustomer(customer: any, token: string): Observable<any> {
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    return this.http.post(`${this.apiUrl}/customers`, customer, { headers });
  }

  /**
   * Actualizar un cliente existente
   * @param id ID del cliente a actualizar
   * @param customer Datos del cliente a actualizar
   * @param token Token de autenticación
   */
  updateCustomer(id: number, customer: any, token: string): Observable<any> {
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    return this.http.put(`${this.apiUrl}/customers/${id}`, customer, { headers });
  }

  /**
   * Eliminar un cliente
   * @param id ID del cliente a eliminar
   * @param token Token de autenticación
   */
  deleteCustomer(id: number, token: string): Observable<any> {
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    return this.http.delete(`${this.apiUrl}/customers/${id}`, { headers });
  }
}
