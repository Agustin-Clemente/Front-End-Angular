import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { educacion } from 'src/app/model/educacion.model';
import Swal from 'sweetalert2';
import { EducacionComponent } from '../educacion/educacion.component';
import { EducacionService } from '../../services/educacion.service';


@Component({
  //providers: [EducacionComponent],
  selector: 'app-editar-educacion',
  templateUrl: './editar-educacion.component.html',
  styleUrls: ['./editar-educacion.component.css']
})
export class EditarEducacionComponent implements OnInit {

  //@Output() traerLista = new EventEmitter<void>();


  public listaEducacion: educacion[]=[];

  id: number;

  edu: educacion = new educacion();

  show=false;

  constructor(private eduServ: EducacionService, private router:Router, private route: ActivatedRoute, private compo: EducacionComponent) {}

  ngOnInit(): void {
    /*
    this.id = this.route.snapshot.params['id'];
    this.eduServ.buscarEducacion(this.id).subscribe(dato =>{
      this.edu = dato;
    })
    */
  }

  volverAHome(){
this.compo.traerLista();
    //this.router.navigate(['portfolio'] );
  }

  editar(){
    let id= localStorage.getItem("id");
    this.eduServ.buscarEducacion(+id).subscribe(dato=>{
      this.edu=dato;
    })
  }

  public agregarEdu(edu:educacion){
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
      this.eduServ.agregarEdu(edu).subscribe(data=>{
        this.eduServ.obtenerEducacion();
        
        this.hideModal();
        this.volverAHome();
       // this.compo.traerLista();
        //this.eduServ.obtenerEducacion().subscribe(dato=>{
          //this.listaEducacion=dato;
        //});
      //this.volverAHome();
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
    this.eduServ.editarEdu(this.id,this.edu).subscribe(data=>{
      //this.eduServ.obtenerEducacion();
      this.eduServ.obtenerEducacion().subscribe(dato=>{
        this.listaEducacion=dato;
      });
      
      this.hideModal();
      this.volverAHome();
      //this.compo.traerLista();
      
      //this.eduServ.obtenerEducacion();
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

  /*
  public verLista(){
  this.eduServ.obtenerEducacion().subscribe(dato=>{
    this.listaEducacion=dato;
  });
}
*/
  /*
  public verLista(){
    this.eduServ.obtenerEducacion();
    this.traerLista.emit();
    //this.$parent[]
    //this.eduServ.obtenerEducacion();
    //this.eduServ.emitirEvento();
  }
*/
  public showModal(id:number){
    this.id = id;
    this.eduServ.buscarEducacion(this.id).subscribe(dato =>{
      this.edu = dato;})
    this.show=true;
    
  }

  hideModal(){
    this.show=false;
    //this.eduServ.obtenerEducacion();
  }
}



