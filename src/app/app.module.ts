import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EncabezadoComponent } from './components/encabezado/encabezado.component';
import { AcercaDeComponent } from './components/acerca-de/acerca-de.component';
import { ExperienciaComponent } from './components/experiencia/experiencia.component';
import { EducacionComponent } from './components/educacion/educacion.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AptitudesComponent } from './components/aptitudes/aptitudes.component';
import { ProyectosComponent } from './components/proyectos/proyectos.component';
import { PortfolioService } from './services/portfolio.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { SkillsComponent } from './components/skills/skills.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgregarExperienciaComponent } from './components/agregar-experiencia/agregar-experiencia.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { InterceptorService } from './services/interceptor.service';
//import { ExtraOptions, RouterModule, Routes, RoutesRecognized } from '@angular/router';
//import { InterceptorService } from './services/interceptor.service';



@NgModule({
  declarations: [
    AppComponent,
    EncabezadoComponent,
    AcercaDeComponent,
    ExperienciaComponent,
    EducacionComponent,
    NavbarComponent,
    AptitudesComponent,
    ProyectosComponent,
    SkillsComponent,
    AgregarExperienciaComponent,
    HomeComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgCircleProgressModule.forRoot({}),
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  
  providers: [PortfolioService, //InterceptorService
  {provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi:true}
],
  bootstrap: [AppComponent]
})
export class AppModule { }
