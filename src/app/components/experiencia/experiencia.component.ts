import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { experiencia } from 'src/app/model/experiencia.model';
import { ExperienciaService } from 'src/app/services/experiencia.service';
import { TokenService } from 'src/app/services/token.service';
import Swal from 'sweetalert2';


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
        this.listaExperiencia=dato;
      });
      
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

/* HABILITAR ESTE
  public onDelete(id:number){
    Swal.fire({
      title: 'Estas seguro/a?',
      text: "No podrás revertir esta acción!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, elimínalo!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.experienciaService.delete(id).subscribe(data=>{
          console.log(data);
          this.experienciaService.obtenerExperiencia().subscribe(dato=>{
            this.listaExperiencia=dato;
          });
        });
        Swal.fire(
          'Eliminado!',
          'La experiencia fue eliminada.',
          'success'
        )
      }
    })
  }
}

*/
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

public editar(exp:experiencia){
  localStorage.setItem("id",exp.id.toString());
  this.router.navigate(["agregar-experiencia"])
}


}