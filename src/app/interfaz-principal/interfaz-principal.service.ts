import { HttpClient,HttpClientModule } from '@angular/common/http';
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

  getUsuariosSSE(): Observable<UserStatus[]> {
    return new Observable((observer) => {
      // Establece la conexión SSE al backend
      // const link = 'http://localhost:8080/api/users/status'
      const link = 'https://localizasos.alwaysdata.net/api/users/status'
      const eventSource = new EventSource(link);

      // Manejar mensajes recibidos del servidor
      eventSource.onmessage = (event) => {
        const data: UserStatus[] = JSON.parse(event.data); // Parsea los datos recibidos
        observer.next(data); // Emite los datos al suscriptor
      };

      // Manejar errores en la conexión
      eventSource.onerror = (error) => {
        observer.error(error); // Informa del error
        eventSource.close(); // Cierra la conexión
      };

      // Define cómo cerrar la conexión cuando el observable se complete
      return () => eventSource.close();
    });
  }

  clear() {
    this.messages = [];
  }
}
