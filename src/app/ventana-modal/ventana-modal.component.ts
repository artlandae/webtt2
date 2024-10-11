import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { VentanaModalService } from './ventana-modal.service';
// import { usuario } from './ventana-modal.model';
import { usuario } from '../interfaz-principal/interfaz-principal.model';


@Component({
  selector: 'app-ventana-modal',
  standalone: true,
  imports: [],
  templateUrl: './ventana-modal.component.html',
  styleUrl: './ventana-modal.component.css'
})
export class VentanaModalComponent {
  constructor(public _matDialogRef: MatDialogRef<VentanaModalComponent>,
    @Inject(MAT_DIALOG_DATA) public id: number, private service: VentanaModalService
  ){}

  user!: usuario[];

  ngOnInit(): void {  
    this.service.getUsuario().subscribe(
      (data) => {
        this.user=data;
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
  );
}

  close(): void {
    this._matDialogRef.close();  
  }
}
