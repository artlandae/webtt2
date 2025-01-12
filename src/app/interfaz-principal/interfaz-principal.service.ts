import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// import { usuario } from './interfaz-principal.model';
import { UserStatus, usuario } from '../interfaz-principal/interfaz-principal.model';



@Injectable({
  providedIn: 'root'
})
export class InterfazPrincipalService {

  constructor(private HTTP: HttpClient) { }

  messages: string[] = [];

  getUsuarios(): Observable<UserStatus[]> {
    // return this.HTTP.get<usuario[]>('https://jsonplaceholder.typicode.com/posts');
    // return this.HTTP.get<UserStatus[]>('http://localhost:8080/api/users/status');
    return this.HTTP.get<UserStatus[]>('http://localizasos.alwaysdata.net/api/users/status');
  }

  clear() {
    this.messages = [];
  }
}
