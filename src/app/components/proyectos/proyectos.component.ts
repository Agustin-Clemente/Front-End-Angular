import { Component, OnInit } from '@angular/core';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { proyectos } from 'src/app/model/proyectos.model';
import { ProyectosService } from 'src/app/services/proyectos.service';
import { TokenService } from 'src/app/services/token.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent implements OnInit {

  public listaProyectos: proyectos[]=[];

  proy : proyectos = new proyectos();
  proye : proyectos = new proyectos();

  id: number;

  isAdmin= false;
  roles : string[];

  fatrashcan= faTrash;
  fapen= faPen;

  displayStyle = "none";

  mostrar=false;
  
  show=false;

  constructor(private proyectoService:ProyectosService, private tokenServ:TokenService) { }

  ngOnInit(): void {
    this.proyectoService.obtenerProyectos().subscribe(data=>{
      this.listaProyectos=data;
    })

    this.roles = this.tokenServ.getAuthorities();
  this.roles.forEach(rol=>{
    if(rol === 'ROLE_ADMIN'){
      this.isAdmin= true;
    }
  });
  }

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
        this.proyectoService.delete(id).subscribe(data=>{
          console.log(data);
          this.proyectoService.obtenerProyectos().subscribe(dato=>{
            this.listaProyectos=dato;
          });
        });
        Swal.fire({
          title:  '¡Eliminado!',
        text:'El proyecto fue eliminado.',
  icon: 'success',
    iconColor: 'aqua',
    color:'red',
    background: 'black',
        showConfirmButton: false,
        timer: 2500
        }
        )
      }
    })
  }

  openPopup() {
   this.displayStyle = "block";
  }

  closePopup() {
   this.displayStyle = "none";
  }

  public showModal(){
    this.show=true; 
  }

  public hideModal(){
    this.show=false;
    //this.eduServ.obtenerEducacion();
  }

  public abrir(id:number){
    this.id = id;
    this.proyectoService.buscarProyecto(this.id).subscribe(dato =>{
      this.proy = dato;})
    this.mostrar=true; 
  }

  public cerrar(){
    this.mostrar=false;
    //this.eduServ.obtenerEducacion();
  }

  onSubmit(){
    //this.guardarExp();
    this.proyectoService.agregarProy(this.proye).subscribe(data=>{
      console.log(data);
      //this.volverAHome();
      this.proyectoService.obtenerProyectos().subscribe(dato=>{
        this.listaProyectos=dato;
        this.hideModal();
      });
      Swal.fire({
        position: 'center',
        icon: 'success',
        
        title: 'Proyecto creado con éxito',
        color:'aqua',
            background: 'black',
        showConfirmButton: false,
        timer: 1500
      })
    })//, error => console.log(error));
  
  }

  public editarProy(proy:proyectos){
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
        //this.editar();
      this.proyectoService.editarProyecto(proy.id,proy).subscribe(()=>{
        
        this.proyectoService.obtenerProyectos().subscribe(dato=>{
          this.listaProyectos=dato;
        
        this.cerrar();
       // this.volverAHome();
       // this.compo.traerLista();
        //this.eduServ.obtenerEducacion().subscribe(dato=>{
          //this.listaEducacion=dato;
        //});
      //this.volverAHome();
        
    })
   } )
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

}
