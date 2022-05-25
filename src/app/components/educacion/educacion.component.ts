import { Component, OnInit } from '@angular/core';
import { educacion } from 'src/app/model/educacion.model';
import { EducacionService } from 'src/app/services/educacion.service';
//import { PortfolioService } from 'src/app/services/portfolio.service';

@Component({
  selector: 'app-educacion',
  templateUrl: './educacion.component.html',
  styleUrls: ['./educacion.component.css']
})
export class EducacionComponent implements OnInit {

  public listaEducacion: educacion[]=[];
  //educacionList:any;

  //constructor(private datosPortfolio:PortfolioService) { }
  constructor(private educacionService:EducacionService) { }
/*
  ngOnInit(): void {
    this.datosPortfolio.obtenerDatos().subscribe(data=>{
this.educacionList=data.education;
    })
  }
  */
  ngOnInit(): void {
    this.educacionService.obtenerEducacion().subscribe(data=>{
this.listaEducacion=data;
    })
  }

}
