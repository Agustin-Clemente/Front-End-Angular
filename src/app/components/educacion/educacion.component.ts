import { AfterViewChecked, AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { EditarEducacionComponent } from 'src/app/components/editar-educacion/editar-educacion.component';
import { educacion } from 'src/app/model/educacion.model';
import { EducacionService } from 'src/app/services/educacion.service';
import { TokenService } from 'src/app/services/token.service';
import Swal from 'sweetalert2';
//import { PortfolioService } from 'src/app/services/portfolio.service';

@Component({
  selector: 'app-educacion',
  /*
  template: `
    <app-editar-educacion
      (traerLista)="onEventLaunched($event)">
    </app-editar-educacion>`,
    */
  templateUrl: './educacion.component.html',
  styleUrls: ['./educacion.component.css']
})
export class EducacionComponent implements OnInit{

  //@ViewChild(EditarEducacionComponent) edit: EditarEducacionComponent;


  public listaEducacion: educacion[]=[];
  //educacionList:any;

  //constructor(private datosPortfolio:PortfolioService) { }
  isAdmin= false;
  roles : string[];

  fatrashcan= faTrash;
  fapen= faPen;


  constructor(private educacionService:EducacionService , private route: ActivatedRoute,private router:Router, private tokenServ:TokenService) {
    //educacionService.$emitter.subscribe(()=> {
      //this.traerLista();
    //});
   }
/*
  ngOnInit(): void {
    this.datosPortfolio.obtenerDatos().subscribe(data=>{
this.educacionList=data.education;
    })
  }
  */
  ngOnInit(): void {
    this.educacionService.obtenerEducacion().subscribe(data=>{
      data=data.sort((a,b)=>this.convertirFecha(b.hasta).getTime() - this.convertirFecha(a.hasta).getTime());
this.listaEducacion=data;
    })

    this.roles = this.tokenServ.getAuthorities();
  this.roles.forEach(rol=>{
    if(rol === 'ROLE_ADMIN'){
      this.isAdmin= true;
    }
  });
}

/*
send(){
  this.edit.verLista();
}
*/
/*
ngAfterViewChecked(): void {
  this.listaEducacion=this.edit.verLista();
}
*/

/*
public onEdit(id:number){
  //this.router.navigate(['editar-educacion',id]);
}
*/
public onDelete(id:number){
  Swal.fire({
    title: '¿Estas seguro/a?',
    text: "¡No podrás revertir esta acción!",
    icon: 'warning',
    iconColor: 'red',
    color:'red',
    background: 'black',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    confirmButtonText: '¡Si, elimínalo!',
    cancelButtonColor: '#d33',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {
      this.educacionService.delete(id).subscribe(data=>{
        console.log(data);
        this.educacionService.obtenerEducacion().subscribe(dato=>{
          //dato=dato.sort((a,b)=>this.convertirFecha(b.hasta).getTime() - this.convertirFecha(a.hasta).getTime());
          this.listaEducacion=dato;
          //this.traerLista();
        });
      });
      Swal.fire({
        title:  '¡Eliminado!',
        text:'La educacion fue eliminada.',
  icon: 'success',
    iconColor: 'aqua',
    color:'red',
    background: 'black',
        showConfirmButton: false,
        timer: 2500
    })
    }
  })
}

/*
onEventLaunched() {
  this.educacionService.obtenerEducacion();
}
*/

public traerLista(){
  //this.edit.verLista();
  this.educacionService.obtenerEducacion().subscribe(data=>{
    data=data.sort((a,b)=>this.convertirFecha(b.hasta).getTime() - this.convertirFecha(a.hasta).getTime());
this.listaEducacion=data;
  //this.educacionService.obtenerEducacion().subscribe(dato=>{
    //this.listaEducacion=dato;
  });
}


public editar(edu: educacion){
  localStorage.setItem("id",edu.id.toString());
  //this.router.navigate(["editar-educacion"])
}

convertirFecha (fechaString) {
  var fechaSp = fechaString.split("-");
  var anio = 2022;
  var mes = 1;
  var dia = 1;
  if(fechaString.toLowerCase().startsWith("actual")){
    anio= new Date().getFullYear();
    mes = new Date().getMonth();
    dia = new Date().getDay();
  }
  if (fechaSp.length == 3) {
    anio = fechaSp[2];
    mes = fechaSp[1];
    dia = fechaSp[0];
  }
  if(fechaSp.length == 2){
    anio = fechaSp[1];
    mes = fechaSp[0];
  }
  
  return new Date(anio, mes, dia);
}


}
