import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './componentes/login/login.component';
import { HomeComponent } from './componentes/home/home.component';

import { GuardGuard } from './auth/guard.guard';
import { TipoUsuarioGuard } from './auth/tipo-usuario.guard';

import { CalendarioComponent } from './calendario/calendario.component';
import { RealizarEncuestaComponent } from './tareasCliente/realizar-encuesta/realizar-encuesta.component';
import { VerTurnosComponent } from './tareasCliente/ver-turnos/ver-turnos.component';
import { PedirTurnoComponent } from './tareasCliente/pedir-turno/pedir-turno.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {path: 'home', component: HomeComponent,
  canActivate: [GuardGuard]},
  {path: 'calendario', component: CalendarioComponent,
  canActivate: [TipoUsuarioGuard]},
  {path: 'pedirTurno', component: PedirTurnoComponent,
  canActivate: [TipoUsuarioGuard]},
  {path: 'pedirTurnoRecep', component: PedirTurnoComponent,
  canActivate: [TipoUsuarioGuard]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
