import { Component, OnInit } from '@angular/core';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { persona } from 'src/app/model/persona.model';
import { PersonaService } from 'src/app/services/persona.service';
import { TokenService } from 'src/app/services/token.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-acerca-de',
  templateUrl: './acerca-de.component.html',
  styleUrls: ['./acerca-de.component.css']
})
export class AcercaDeComponent implements OnInit {
  persona: persona = new persona();
  perso:persona = new persona();

  isAdmin= false;

  id: number;

  fapen= faPen;

  roles : string[];

  mostrar=false;

  constructor(public personaService : PersonaService, private tokenServ:TokenService) { }

  ngOnInit(): void {
    this.personaService.getPersona().subscribe(data => {this.persona = data})

    this.roles = this.tokenServ.getAuthorities();
    this.roles.forEach(rol=>{
      if(rol === 'ROLE_ADMIN'){
        this.isAdmin= true;
      }
    });
  }

  public abrir(id:number){
    this.id = id;
    this.personaService.buscarPersona(this.id).subscribe(dato =>{
      this.perso = dato;})
    this.mostrar=true; 
  }

  public cerrar(){
    this.mostrar=false;
    //this.eduServ.obtenerEducacion();
  }

  public editarAcercaDe(per:persona){
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
      this.personaService.editarAcercaDe(per.id,per).subscribe(()=>{
        
        this.personaService.getPersona().subscribe(dato=>{
          this.persona=dato;
        
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
