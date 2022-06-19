import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AcercaDeComponent } from './components/acerca-de/acerca-de.component';
import { AgregarExperienciaComponent } from './components/agregar-experiencia/agregar-experiencia.component';
import { EducacionComponent } from './components/educacion/educacion.component';
import { ExperienciaComponent } from './components/experiencia/experiencia.component';
import { HomeComponent } from './components/home/home.component';

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
  
  {path:'agregar-experiencia/:id', component: AgregarExperienciaComponent},
  {path: 'acerca', component: AcercaDeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
