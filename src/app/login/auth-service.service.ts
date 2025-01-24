import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor() { }

  // Verificar si el usuario está autenticado
  isAuthenticated(): boolean {
    const id = localStorage.getItem('id');
    console.log('Valor recuperado en isAuthenticated:', id);
    if(isNaN(Number(id))) {
      return false;
    }
    return !!id; // Retorna true si hay un token
  }

  // Cerrar sesión
  logout(): void {
    localStorage.removeItem('id');
    console.log('Sesión cerrada.');
  }

}
