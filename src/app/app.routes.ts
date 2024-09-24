import { Routes } from '@angular/router';
import { InterfazPrincipalComponent } from './interfaz-principal/interfaz-principal.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
    { path: 'interfaz-principal', component: InterfazPrincipalComponent },
    { path: '**', component: LoginComponent },
];
