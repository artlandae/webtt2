import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from '../app.config';

@Injectable({
  providedIn: 'root'
})
export class InicioSesionService {

  private userId: string | null = null; // Variable para almacenar el ID
  private userPassword: string | null = null; // Variable para almacenar la contraseña
  private userEmail: string | null = null; // Variable para almacenar el correo electrónico  

  constructor(private http: HttpClient) { }

  login(emailAddress: string, password: string): Observable<LoginResponse> {
    // const url = `http://localhost:8080/api/users/login`;
    const url = `${API_URL}/api/users/login`;
    const body = { emailAddress, password };

    return this.http.post<LoginResponse>(url, body); // Realiza la solicitud POST
  }

  role(emailAddress: string, password: string): Observable<number> {
    // const url = `http://localhost:8080/api/users/login-role`;
    const url = `${API_URL}/api/users/login.role`;
    const body = { emailAddress, password };

    return this.http.post<number>(url, body); // Realiza la solicitud POST
  }

  // Método para guardar el ID
  setVariable(id: string) {
    this.userId = id;
  }

  // Método para obtener el ID
  getVariable() {
    return this.userId;
  }

  // Método para guardar la contraseña
  setPassword(password: string) {
    this.userPassword = password;
  }

  // Método para obtener la contraseña
  getPassword() {
    return this.userPassword;
  }

  // Método para guardar el correo electrónico
  setUserEmail(email: string) {
    this.userEmail = email;
  }

  // Método para obtener el correo electrónico
  getUserEmail(): string | null {
    return this.userEmail;
  }

  async saveToken(token: string): Promise<void> {
    localStorage.setItem('auth_token', token);
  }

  async saveID(id: string): Promise<void> {
    localStorage.setItem('id', id);
  }

  async savePassword(password: string): Promise<void> {
    localStorage.setItem('password', password);
  }

  async saveUserEmail(email: string): Promise<void> {
    localStorage.setItem('email', email);
  }

  async getToken(): Promise<string | null> {
    return localStorage.getItem('auth_token');
  }

  async getID(): Promise<string | null> {
    return localStorage.getItem('id');
  }

  async getPass(): Promise<string | null> {
    return localStorage.getItem('password');
  }
}

export interface LoginResponse {
  id: string; // o string, dependiendo de cómo manejes los IDs
  password: string;
  emailAddress: string; // Agregar el correo electrónico en la respuesta
}
