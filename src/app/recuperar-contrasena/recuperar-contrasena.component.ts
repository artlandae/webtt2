import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecuperarContrasenaService } from './recuperar-contrasena.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MensajesService } from '../services/mensajes.service';

@Component({
  selector: 'app-recuperar-contrasena',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './recuperar-contrasena.component.html',
  styleUrls: ['./recuperar-contrasena.component.css']
})
export class RecuperarContrasenaComponent implements OnInit {
  mensajePassActual = false;
  mensajePass = false;
  mensajeGeneral = false;
  passActual = '';
  passNueva = '';
  passNuevar = '';
  token: string | null = null;
  userPassword: string | null = null;

  get mensajes() {
    return this.mensajesService.mensajes;
  }

  constructor(
    private recuperarcontrasenaservice: RecuperarContrasenaService,
    private mensajesService: MensajesService,
    private route: ActivatedRoute // Inject ActivatedRoute
  ) {
    this.mensajePass = false;
    this.mensajePassActual = false;
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.token = params.get('token'); // Get the token from the route
      console.log(this.token);
    });
  }

  validarPassActual(contrasena: string) {
    return contrasena === this.userPassword;
  }

  validarPass(valor: string) {
    return valor.length === 0 || valor.length < 8 || valor.length > 16;
  }

  agregarMsj() {
    this.mensajesService.agregarMensaje("Contraseña cambiada");
    setTimeout(() => {
      this.mensajesService.agregarMensaje("");
    }, 3000);
  }

  cambiarPassword() {
    this.recuperarcontrasenaservice.actualizarPassword(this.token!, this.passNueva).subscribe({
      next: (response) => {
        console.log('Contraseña actualizada con éxito:', response);
        this.agregarMsj(); // Notify user of successful password change
      },
      error: (error) => {
        console.error('Error al actualizar la contraseña:', error);
      }
    });
  }
}
