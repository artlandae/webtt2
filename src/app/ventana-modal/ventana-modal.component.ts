import { Component } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-ventana-modal',
  standalone: true,
  imports: [],
  templateUrl: './ventana-modal.component.html',
  styleUrl: './ventana-modal.component.css'
})
export class VentanaModalComponent {
  constructor(public _matDialogRef: MatDialogRef<VentanaModalComponent>){}

  onNoClick(): void {
    this._matDialogRef.close();  
  }
}
