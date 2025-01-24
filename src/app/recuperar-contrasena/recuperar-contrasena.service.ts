import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from '../app.config';

@Injectable({
  providedIn: 'root'
})
export class RecuperarContrasenaService {

  constructor(private http: HttpClient) { }

  actualizarPassword(token: string, password: string | null): Observable<any> {
    const url = `${API_URL}/api/users/update-password?token=${token}`; // Updated URL
    // const url = `http://localhost:8080/api/users/update-password?token=${token}`;
    const body = { password }; // Request body
    return this.http.put(url, body); // Perform the PUT request
  }
}
