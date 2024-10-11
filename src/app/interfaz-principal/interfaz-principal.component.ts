
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { VentanaModalComponent } from '../ventana-modal/ventana-modal.component';
import { CommonModule } from '@angular/common';
import { InterfazPrincipalService } from './interfaz-principal.service';
import { usuario } from './interfaz-principal.model';

@Component({
  selector: 'app-interfaz-principal',
  standalone: true,
  imports: [RouterLink, RouterOutlet,CommonModule],
  templateUrl: './interfaz-principal.component.html',
  styleUrl: './interfaz-principal.component.css',

})

export class InterfazPrincipalComponent {
  constructor(private _matDialog: MatDialog, private service: InterfazPrincipalService) {}

  // users: Observable<usuario[]> | undefined;
  sos!: boolean
  users!: usuario[];
  id!: number;

  ngOnInit(): void {  
    this.service.getUsuarios().subscribe(
      (data) => {
        this.users = data;
        console.log(data);
        console.log(this.users[0]);
        // this.users=[];
        if (this.users.length==0){
          this.sos=false;
        }else{
          this.sos=true;
        }
      },
      (error) => {
        console.log(error);
      }
  );
}

  abrirModal(id: number):void {
    this._matDialog.open(VentanaModalComponent, {
      width:'1200px',
      data: id
    });
  }
}
