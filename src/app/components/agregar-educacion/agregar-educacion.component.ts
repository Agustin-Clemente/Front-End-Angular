import { Component, OnInit } from '@angular/core';
import { educacion } from 'src/app/model/educacion.model';
import { EducacionService } from 'src/app/services/educacion.service';
import Swal from 'sweetalert2';
import { EducacionComponent } from '../educacion/educacion.component';

@Component({
  selector: 'app-agregar-educacion',
  templateUrl: './agregar-educacion.component.html',
  styleUrls: ['./agregar-educacion.component.css']
})
export class AgregarEducacionComponent implements OnInit {

  show=false;

  id: number;

  edu: educacion = new educacion();

  public listaEducacion: educacion[]=[];

  constructor(private eduServ: EducacionService,private compo: EducacionComponent) { }

  ngOnInit(): void {
  }

  public showModal(){
    //this.id = id;
    //this.eduServ.buscarEducacion(this.id).subscribe(dato =>{
      //this.edu = dato;})
    this.show=true;
    
  }

  volverAHome(){
    this.compo.traerLista();
        //this.router.navigate(['portfolio'] );
      }

  crear(){
    //this.guardarExp();
    this.eduServ.agregarEdu(this.edu).subscribe(data=>{
      console.log(data);
      //this.volverAHome();
      this.eduServ.obtenerEducacion().subscribe(dato=>{
        dato=dato.sort((a,b)=>this.convertirFecha(b.hasta).getTime() - this.convertirFecha(a.hasta).getTime());
        this.listaEducacion=dato;
        this.hideModal();
        this.volverAHome();
      });
      Swal.fire({
        position: 'center',
        icon: 'success',
        
        title: 'Educación creada con éxito',
        color:'aqua',
            background: 'black',
        showConfirmButton: false,
        timer: 1500
      })
    })//, error => console.log(error));
  
  }

  hideModal(){
    this.show=false;
    //this.eduServ.obtenerEducacion();
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
