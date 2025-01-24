import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { VentanaModalService } from './ventana-modal.service';
import { usuario } from './ventana-modal.model';
// import { usuario } from '../interfaz-principal/interfaz-principal.model';
import { GoogleMapsModule } from '@angular/google-maps';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';


@Component({
  selector: 'app-ventana-modal',
  standalone: true,
  imports: [GoogleMapsModule],
  templateUrl: './ventana-modal.component.html',
  styleUrl: './ventana-modal.component.css'
})
export class VentanaModalComponent {
  sanitizedUrl!: SafeResourceUrl;

  constructor(public _matDialogRef: MatDialogRef<VentanaModalComponent>,
    @Inject(MAT_DIALOG_DATA) public id: number, private service: VentanaModalService,private sanitizer: DomSanitizer
  ){}

  user: usuario = {
    id: 0,
    name: '',
    bloodType: '',
    sex: '',
    allergies: '',
    CriticalIllnes: '',
    cellPhone: 0,
    auxiliaryCellPhone: 0,
    lenght: 0,
    latitud: 0,
  };
  mapsEmbeded: string | undefined;
  
  ngOnInit(): void {  
    
    console.log("el id es: ", this.id)
    this.service.getUsuario(this.id).subscribe(
      (data) => {
        this.user=data;
        this.mapsEmbeded='https://www.google.com/maps/embed/v1/place?key=AIzaSyAbwiun41ey_hDeHQbj9hjS5R5Df4Z4d3s&q='+this.user.latitud+','+this.user.lenght+'&center='+this.user.latitud+','+this.user.lenght+'';
        
        this.sanitizedUrl=this.sanitizer.bypassSecurityTrustResourceUrl(this.mapsEmbeded);
        console.log(this.sanitizedUrl)
        console.log(this.user);
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
