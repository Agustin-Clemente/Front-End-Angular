import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { faPen, faTimes, faTrash } from '@fortawesome/free-solid-svg-icons';
import { experiencia } from 'src/app/model/experiencia.model';
import { ExperienciaService } from 'src/app/services/experiencia.service';
import { TokenService } from 'src/app/services/token.service';
import Swal from 'sweetalert2';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';


@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.css']
})
export class ExperienciaComponent implements OnInit {

  public listaExperiencia: experiencia[]=[];

  id: number;

  exp : experiencia = new experiencia();

  roles : string[];

  isAdmin= false;

  fatimes = faTimes;
  fatrashcan= faTrash;
  fapen= faPen;

  constructor(private experienciaService:ExperienciaService, private route: ActivatedRoute,private router:Router, private tokenServ:TokenService) { }

  ngOnInit(): void {
    
  
    /*
    this.route.params.subscribe(params => {
    this.experienciaService.obtenerExperiencia().subscribe(data=>{
      this.listaExperiencia=data;


      
      this.id = this.route.snapshot.params['id'];
      this.experienciaService.buscarExperiencia(this.id).subscribe(dato =>{
        this.exp = dato;
      })
        
      });
  
  });
  */
  this.experienciaService.obtenerExperiencia().subscribe(dato =>{
   dato=dato.sort((a,b)=>this.convertirFecha(b.hasta).getTime() - this.convertirFecha(a.hasta).getTime());
    this.listaExperiencia = dato;
  })

  this.roles = this.tokenServ.getAuthorities();
  this.roles.forEach(rol=>{
    if(rol === 'ROLE_ADMIN'){
      this.isAdmin= true;
    }
  });
  }

  public onEdit(id:number){
    this.router.navigate(['agregar-experiencia',id]);
    /*
    this.experienciaService.editarExp(this.id,this.exp).subscribe(data=>{
      console.log(data);
      this.experienciaService.obtenerExperiencia().subscribe(dato=>{
        this.listaExperiencia=dato;
      });
    });
    */
    /*
  Swal.fire({
    title: 'Editadaaaaaa',
    width: 600,
    padding: '3em',
    color: '#716add',
    background: 'black',
    backdrop: `
      rgba(0,0,123,0.4)
      url("https://c.tenor.com/lTtlX5xlfmgAAAAC/nyan-cat.gif")
      left top
      repeat
    `
  })
  */
  }
  
  displayStyle = "none";

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
    this.displayStyle = "none";
  }

  /*
  guardarExp(){
    this.experienciaService.agregarExp(this.exp).subscribe(data=>{
      console.log(data);
      this.experienciaService.obtenerExperiencia();
      //this.volverAHome();
    }, error => console.log(error));
  }

  volverAHome(){
    this.router.navigate(['']);
  }
*/
  onSubmit(){
    //this.guardarExp();
    this.experienciaService.agregarExp(this.exp).subscribe(data=>{
      console.log(data);
      //this.volverAHome();
      this.experienciaService.obtenerExperiencia().subscribe(dato=>{
        dato=dato.sort((a,b)=>this.convertirFecha(b.hasta).getTime() - this.convertirFecha(a.hasta).getTime());
        this.listaExperiencia=dato;
      });
      Swal.fire({
        position: 'center',
        icon: 'success',
        
        title: 'Experiencia creada con éxito',
        color:'aqua',
            background: 'black',
        showConfirmButton: false,
        timer: 1500
      })
    })//, error => console.log(error));
  
  }

  /*
  suscribeCambioDeRuta(): void {
    this.route.params.subscribe(params => {
      this.experienciaService.obtenerExperiencia(params['nombre'])
        .subscribe(edificios =>{
          // Obtengo los datos del edificio
        });
   });
  }
*/
  /*
  public onDelete(id:number){
    console.log("Borrada");
    //if(confirm('Seguro que quiere eliminar?')){
    this.experienciaService.delete(id).subscribe(data=>{
      console.log(data);
      this.experienciaService.obtenerExperiencia().subscribe(dato=>{
        this.listaExperiencia=dato;
      });
    });
    }
  }
*/

/* HABILITAR ESTE*/
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
        this.experienciaService.delete(id).subscribe(data=>{
          console.log(data);
          this.experienciaService.obtenerExperiencia().subscribe(dato=>{
            this.listaExperiencia=dato;
          });
        });
        Swal.fire({
          title:  '¡Eliminado!',
        text:'La experiencia fue eliminada.',
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


/*
public onDelete(id:number){
  this.experienciaService.delete(id).subscribe(data=>{
    console.log(data);
    this.experienciaService.obtenerExperiencia().subscribe(dato=>{
      this.listaExperiencia=dato;
    });
  });
  
Swal.fire({
  title: 'ELIMINADAAAAAAAA',
  width: 600,
  padding: '3em',
  color: '#716add',
  background: 'black',
  backdrop: `
    rgba(0,0,123,0.4)
    url("https://c.tenor.com/lTtlX5xlfmgAAAAC/nyan-cat.gif")
    left top
    repeat
  `
})

}
*/
public editar(exp:experiencia){
  localStorage.setItem("id",exp.id.toString());
  this.router.navigate(["agregar-experiencia"])
}

/*
drop(event: CdkDragDrop<any[]>) {
  if (this.isAdmin===true){
  moveItemInArray(this.listaExperiencia, event.previousIndex, event.currentIndex);
  }
}
*/

drop(event: CdkDragDrop<string[]>) {
  if (this.isAdmin===true){
  moveItemInArray(this.listaExperiencia, event.previousIndex, event.currentIndex);
  }
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




/*
drop(event: CdkDragDrop<any[]>) {
  if (event.previousContainer === event.container) {
    moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
  } else {
    transferArrayItem(event.previousContainer.data,
                      event.container.data,
                      event.previousIndex,
                      event.currentIndex);
    //if transfer, recalculate the order of previous (the list from drag)
    event.previousContainer.data.forEach((x,index)=>{
        x.order=index
    })
  }
  //always, recalculate the order of the container (the list to drag)
    event.container.data.forEach((x,index)=>{
        x.order=index
    })
}
*/

}
