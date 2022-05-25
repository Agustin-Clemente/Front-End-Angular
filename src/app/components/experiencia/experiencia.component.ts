import { Component, OnInit } from '@angular/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { experiencia } from 'src/app/model/experiencia.model';
import { ExperienciaService } from 'src/app/services/experiencia.service';

@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.css']
})
export class ExperienciaComponent implements OnInit {

  public listaExperiencia: experiencia[]=[];

  fatimes = faTimes;

  constructor(private experienciaService:ExperienciaService) { }

  ngOnInit(): void {
    this.experienciaService.obtenerExperiencia().subscribe(data=>{
      this.listaExperiencia=data;
    })
  }

  onDelete(){
    console.log("Borrada");
  }

}
