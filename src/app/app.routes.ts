import { Routes } from '@angular/router';
import { InterfazPrincipalComponent } from './interfaz-principal/interfaz-principal.component';
import { LoginComponent } from './login/login.component';
import { RecuperarContrasenaComponent } from './recuperar-contrasena/recuperar-contrasena.component';

export const routes: Routes = [
    { path: 'recuperar-contrasena', component: RecuperarContrasenaComponent },
    { path: 'interfaz-principal', component: InterfazPrincipalComponent },
    { path: 'login', component: LoginComponent },
    { path: '**', component: LoginComponent },
];
