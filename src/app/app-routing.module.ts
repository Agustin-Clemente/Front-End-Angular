import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AcercaDeComponent } from './components/acerca-de/acerca-de.component';
import { AgregarExperienciaComponent } from './components/agregar-experiencia/agregar-experiencia.component';
import { EducacionComponent } from './components/educacion/educacion.component';
import { ExperienciaComponent } from './components/experiencia/experiencia.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { GuardService as guard } from './guards/guard.service';

const routes: Routes = [
 /*
  {path:'agregar-experiencia', component: AgregarExperienciaComponent},
  {path:'portfolio', component: HomeComponent},
  
  {path:'', component: HomeComponent},
  {path:'login', redirectTo:'portfolio', pathMatch:'full'},
  {path: 'acerca', component: AcercaDeComponent}
  */
  //{path:'', component: AppComponent},
  {path:'portfolio', component: HomeComponent},
  {path:'', redirectTo:'portfolio', pathMatch:'full'},
  {path:'', component: HomeComponent},
  {path:'auth/login', component:LoginComponent},
  {path:'agregar-experiencia/:id', component: AgregarExperienciaComponent,canActivate: [guard], data: {expectedRol: ['admin']}},
  //{path: 'acerca', component: AcercaDeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes), RouterModule.forRoot(routes, { anchorScrolling: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
