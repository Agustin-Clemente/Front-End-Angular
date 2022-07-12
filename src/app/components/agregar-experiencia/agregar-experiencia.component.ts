import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { experiencia } from 'src/app/model/experiencia.model';
import { ExperienciaService } from 'src/app/services/experiencia.service';
import { HomeComponent } from '../home/home.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agregar-experiencia',
  templateUrl: './agregar-experiencia.component.html',
  styleUrls: ['./agregar-experiencia.component.css']
})
export class AgregarExperienciaComponent implements OnInit {

  id: number;

  exp : experiencia = new experiencia();

  constructor(private experienciaserv: ExperienciaService, private router:Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    
    this.id = this.route.snapshot.params['id'];
      this.experienciaserv.buscarExperiencia(this.id).subscribe(dato =>{
        this.exp = dato;
      })
      
    // this.editar();
  }

  volverAHome(){
    this.router.navigate(['portfolio'] );
  }

  onSubmit(){
    Swal.fire({
      title: '¿Quieres guardar los cambios?',
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      denyButtonText: `No guardar`,
      cancelButtonText: 'Cancelar',
       color:'red',
          background: 'black'
    }).then((result) => {
      if (result.isConfirmed) {
    this.experienciaserv.editarExp(this.id,this.exp).subscribe(data=>{
      this.volverAHome();
    })
      //this.experienciaserv.obtenerExperiencia();
      Swal.fire({
        title: 'Los cambios se guardaron con éxito',
        icon: 'success',
        color:'green',
          background: 'black',
        confirmButtonColor: 'green'
      })
  } else if (result.isDenied) {
    Swal.fire('No se guardaron los cambios', '', 'info')
  }

      
    });
  
  }


  displayStyle = "block";

  display: boolean;
  
  
  abrirPopup(){
    this.display = true;
  }

  cerrarPopup(){
    this.display=false;
  }
  
  openPopup() {
    this.displayStyle = "block";
  }
  closePopup() {
    //this.displayStyle = "none";
    this.volverAHome();
  }

  editar(){
    let id= localStorage.getItem("id");
    this.experienciaserv.buscarExperiencia(+id).subscribe(dato=>{
      this.exp=dato;
    })
  }

  public agregarExp(exp:experiencia){
  Swal.fire({
    title: '¿Quieres guardar los cambios?',
    showDenyButton: false,
    showCancelButton: true,
    confirmButtonText: 'Guardar',
    denyButtonText: `No guardar`,
    cancelButtonText: 'Cancelar',
     color:'red',
        background: 'black'
  }).then((result) => {
    if (result.isConfirmed) {
      this.editar();
    this.experienciaserv.agregarExp(exp).subscribe(data=>{

      this.experienciaserv.obtenerExperiencia();
    this.volverAHome();
  })
  Swal.fire({
    title: 'Los cambios se guardaron con éxito',
    icon: 'success',
    color:'green',
      background: 'black',
    confirmButtonColor: 'green'
  })
  } else if (result.isDenied) {
    Swal.fire('No se guardaron los cambios', '', 'info')
  }
})
}

  /* ESTO FUNCIONA
  agregarExp(exp:experiencia){
    this.editar();
    this.experienciaserv.agregarExp(exp).subscribe(data=>{

      this.experienciaserv.obtenerExperiencia();
    this.volverAHome();
    
  });
}
*/
/*
onSubmit(){
  this.agregarExp(this.exp);
}
*/

  /*
  guardarExp(){
    this.experienciaserv.agregarExp(exp).subscribe(data=>{
      console.log(data);
      this.experienciaserv.obtenerExperiencia();
      this.volverAHome();
    }, error => console.log(error));
  }
*/
  

  

  /*
  onSubmit(){
    //this.guardarExp();
    this.experienciaserv.agregarExp(this.exp).subscribe(data=>{
      console.log(data);
      this.volverAHome();
      this.experienciaserv.obtenerExperiencia();
      
    }, error => console.log(error));
  
  }
*/
}
/*
import {Component} from '@angular/core';
  
 
@Component({
  selector: 'ngbd-modal-basic',
  templateUrl: './agregar-experiencia.component.html'
})
export class NgbdModalBasic {
  closeResult = '';
  
  constructor(private modalService: NgbdModalBasic) {}
  
  open(content) {
    this.modalService.open(content,
   {ariaLabelledBy: 'modal-basic-title'}).result.then((result) 
      => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = 
         `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
*/