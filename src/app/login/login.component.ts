import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MensajesService } from '../services/mensajes.service';
import { FormsModule } from '@angular/forms';
import { InicioSesionService } from './inicio-sesion.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  mensajeCorreo = false;
  mensajePass = false;
  mensajeGeneral = false;
  emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  correo = '';
  password = '';
  valido = false;
  isLoginSuccessful: boolean = false; // Bandera para verificar si el inicio de sesión fue exitoso

  get mensajes() {
    return this.mensajesService.mensajes;
  }

  constructor(
    private _matDialog: MatDialog,
    private mensajesService: MensajesService,
    private inicioSesionService: InicioSesionService,
    private router: Router,
    private authService: AuthService // Injecting AuthService
  ) {}

  validarCorreo() {
    if (!this.emailRegex.test(this.correo) || this.correo.length == 0) {
      return this.mensajeCorreo = true;
    } else {
      return this.mensajeCorreo = false;
    }
  }

  validarPass() {
    if (this.password.length == 0) {
      return this.mensajePass = true;
    } else {
      return this.mensajePass = false;
    }
  }

  loguear() {
    this.valido = false;
    this.inicioSesionService.setUserEmail(this.correo);
    console.log(this.correo, this.password);

    // Validación previa al envío
    if (this.correo.length == 0) {
      this.mensajeCorreo = true;
    } else {
      this.mensajeCorreo = false;
    }

    if (this.password.length == 0) {
      this.mensajePass = true;
    } else {
      this.mensajePass = false;
    }

    if (this.mensajeCorreo || this.mensajePass) {
      console.log('Campos vacíos detectados.');
      return; // Detener ejecución si los campos no son válidos
    }

    // Llamada al servicio de rol
    this.inicioSesionService.role(this.correo, this.password).subscribe({
      next: (role) => {
        console.log(role)
        if (role === 1) {
          // Llamada al servicio de inicio de sesión
          this.inicioSesionService.login(this.correo, this.password).subscribe({
            next: (response) => {
              console.log('ID recibido:', response);
              // Guardar los datos del usuario si la respuesta es exitosa
              this.inicioSesionService.setVariable(response.id);
              this.inicioSesionService.setPassword(response.password);
              console.log('Inicio de sesión exitoso. ID de usuario:', this.inicioSesionService.getVariable());

              // Set authentication state
              this.authService.login(); // Call to set the user as logged in

              // Guardar el token recibido al iniciar sesión
              this.inicioSesionService.saveID(response.id).then(() => {
                console.log('ID guardado correctamente.');
              });
              this.inicioSesionService.savePassword(this.password).then(() => {
                console.log('Password guardado correctamente.');
              });

              this.inicioSesionService.saveUserEmail(this.correo).then(() => {
                console.log('Correo guardado correctamente.', this.correo);
              });

              // Redirigir a la interfaz principal
              this.router.navigate(['/interfaz-principal']);
            },
            error: (error) => {
              console.error('Error al iniciar sesión:', error);
              this.router.navigate(['/login']);
              this.mensajeGeneral = true;
              this.mensajesService.agregarMensaje('Error en el inicio de sesión.'); // Set error message
            }
          });
        } else {
          console.log('Error de login: rol no permitido.');
          this.mensajeGeneral = true;
          this.mensajesService.agregarMensaje('Error de login: rol no permitido.'); // Set error message
        }
      },
      error: (error) => {
        console.error('Error al obtener el rol:', error);
        this.mensajeGeneral = true;
        this.mensajesService.agregarMensaje('Error al obtener el rol.'); // Set error message
      }
    });
  }
}
