import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { VentanaModalComponent } from '../ventana-modal/ventana-modal.component';
import { CommonModule } from '@angular/common';
import { InterfazPrincipalService } from './interfaz-principal.service';
import { UserStatus } from './interfaz-principal.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-interfaz-principal',
  standalone: true,
  imports: [RouterLink, RouterOutlet, CommonModule],
  templateUrl: './interfaz-principal.component.html',
  styleUrls: ['./interfaz-principal.component.css'],
})
export class InterfazPrincipalComponent implements OnInit, OnDestroy {
  sos!: boolean; // Indica si hay usuarios en situación de rescate
  users: UserStatus[] = []; // Lista de usuarios
  private sseSubscription!: Subscription; // Suscripción al flujo SSE

  constructor(
    private _matDialog: MatDialog,
    private service: InterfazPrincipalService,
    private cdr: ChangeDetectorRef // Inyección para forzar detección de cambios
  ) {}

  ngOnInit(): void {
    // Suscríbete al flujo SSE para obtener datos en tiempo real
    this.sseSubscription = this.service.getUsuariosSSE().subscribe(
      (data) => {
        console.log('Datos recibidos en el componente:', data); // Verifica los datos recibidos

        // Actualiza la lista de usuarios y el estado
        this.users = data;
        this.sos = this.users.length > 0;

        // Fuerza la detección de cambios manualmente
        this.cdr.detectChanges();
      },
      (error) => {
        console.error('Error al recibir datos SSE:', error); // Manejo de errores
      }
    );
  }

  abrirModal(id: number): void {
    // Abre el modal para el usuario seleccionado
    this._matDialog.open(VentanaModalComponent, {
      data: id,
    });
  }

  ngOnDestroy(): void {
    // Cierra la conexión SSE al destruir el componente
    if (this.sseSubscription) {
      this.sseSubscription.unsubscribe();
    }
  }
}
