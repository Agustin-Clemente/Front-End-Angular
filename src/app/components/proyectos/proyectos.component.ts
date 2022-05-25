import { Component, OnInit } from '@angular/core';
import { proyectos } from 'src/app/model/proyectos.model';
import { ProyectosService } from 'src/app/services/proyectos.service';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent implements OnInit {

  public listaProyectos: proyectos[]=[];

  constructor(private proyectoService:ProyectosService) { }

  ngOnInit(): void {
    this.proyectoService.obtenerProyectos().subscribe(data=>{
      this.listaProyectos=data;
    })
  }

}
