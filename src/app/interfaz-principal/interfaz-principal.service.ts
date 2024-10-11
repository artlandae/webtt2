import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// import { usuario } from './interfaz-principal.model';
import { usuario } from '../interfaz-principal/interfaz-principal.model';



@Injectable({
  providedIn: 'root'
})
export class InterfazPrincipalService {

  constructor(private HTTP: HttpClient) { }

  messages: string[] = [];

  getUsuarios(): Observable<usuario[]> {
    return this.HTTP.get<usuario[]>('https://jsonplaceholder.typicode.com/posts');
  }

  clear() {
    this.messages = [];
  }
}
