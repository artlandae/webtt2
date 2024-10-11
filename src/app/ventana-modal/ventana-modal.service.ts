import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// import { usuario } from './ventana-modal.model';
import { usuario } from '../interfaz-principal/interfaz-principal.model';


@Injectable({
  providedIn: 'root'
})
export class VentanaModalService {

  constructor(private HTTP: HttpClient) { }

  getUsuario(): Observable<usuario[]> {
    return this.HTTP.get<usuario[]>('https://jsonplaceholder.typicode.com/posts');
  }

}
