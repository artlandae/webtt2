import { Routes } from '@angular/router';
import { InterfazPrincipalComponent } from './interfaz-principal/interfaz-principal.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { RecuperarContrasenaComponent } from './recuperar-contrasena/recuperar-contrasena.component';

export const routes: Routes = [
    { path: 'interfaz-principal', component: InterfazPrincipalComponent, canActivate: [AuthGuard] },
    { path: 'recuperar-contrasena/:id', component: RecuperarContrasenaComponent }, // Updated route
    { path: 'login', component: LoginComponent },
    { path: '**', component: LoginComponent },
];
