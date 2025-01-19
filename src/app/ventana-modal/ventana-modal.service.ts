import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { usuario } from './ventana-modal.model';
// import { usuario } from '../interfaz-principal/interfaz-principal.model';


@Injectable({
  providedIn: 'root'
})
export class VentanaModalService {

  constructor(private HTTP: HttpClient) { }

  getUsuario(id: number): Observable<usuario> {
    // return this.HTTP.get<usuario>('http://localhost:8080/api/users/'+id);
    // return this.HTTP.get<usuario[]>('https://jsonplaceholder.typicode.com/posts');
    return this.HTTP.get<usuario>('http://localizasos.alwaysdata.net/api/users/'+id);
  }

}
