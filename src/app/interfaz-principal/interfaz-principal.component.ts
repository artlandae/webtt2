import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { VentanaModalComponent } from '../ventana-modal/ventana-modal.component';

@Component({
  selector: 'app-interfaz-principal',
  standalone: true,
  imports: [RouterLink, RouterOutlet],
  templateUrl: './interfaz-principal.component.html',
  styleUrl: './interfaz-principal.component.css'
})
export class InterfazPrincipalComponent {
  constructor(private _matDialog: MatDialog) {}
  abrirModal():void {
    this._matDialog.open(VentanaModalComponent, {
      width:'1200px'
    })
  }
}
