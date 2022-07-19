import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgregarExperienciaComponent } from './components/agregar-experiencia/agregar-experiencia.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { GuardService as guard } from './guards/guard.service';

const routes: Routes = [

  { path: 'portfolio', component: HomeComponent },
  { path: '', redirectTo: 'portfolio', pathMatch: 'full' },
  { path: '', component: HomeComponent },
  { path: 'auth/login', component: LoginComponent },
  { path: 'agregar-experiencia/:id', component: AgregarExperienciaComponent, canActivate: [guard], data: { expectedRol: ['admin'] } },

];

@NgModule({
  imports: [RouterModule.forRoot(routes), RouterModule.forRoot(routes, { anchorScrolling: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
