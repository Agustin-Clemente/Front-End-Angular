import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
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

  public listaExperiencia: experiencia[] = [];

  id: number;

  exp: experiencia = new experiencia();

  roles: string[];

  isAdmin = false;

  fatrashcan = faTrash;
  fapen = faPen;

  displayStyle = "none";

  display: boolean;

  constructor(private experienciaService: ExperienciaService, private router: Router, private tokenServ: TokenService) { }

  ngOnInit(): void {
    this.experienciaService.obtenerExperiencia().subscribe(dato => {
      dato = dato.sort((a, b) => this.convertirFecha(b.hasta).getTime() - this.convertirFecha(a.hasta).getTime());
      this.listaExperiencia = dato;
    })

    this.roles = this.tokenServ.getAuthorities();
    this.roles.forEach(rol => {
      if (rol === 'ROLE_ADMIN') {
        this.isAdmin = true;
      }
    });
  }

  public onEdit(id: number) {
    this.router.navigate(['agregar-experiencia', id]);
  }

  openPopup() {
    this.displayStyle = "block";
  }
  closePopup() {
    this.displayStyle = "none";
  }


  onSubmit() {
    this.experienciaService.agregarExp(this.exp).subscribe(data => {
      console.log(data);
      console.log(this.exp.hasta);
      console.log(this.convertirFecha(this.exp.hasta));
      this.experienciaService.obtenerExperiencia().subscribe(dato => {
        dato = dato.sort((a, b) => this.convertirFecha(b.hasta).getTime() - this.convertirFecha(a.hasta).getTime());
        this.listaExperiencia = dato;
        this.closePopup();
      });
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Experiencia creada con éxito',
        color: 'aqua',
        background: 'black',
        showConfirmButton: false,
        timer: 1500
      })
    })

  }

  public onDelete(id: number) {
    Swal.fire({
      title: '¿Estas seguro/a?',
      text: "¡No podrás revertir esta acción!",
      icon: 'warning',
      iconColor: 'red',
      color: 'red',
      background: 'black',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      confirmButtonText: '¡Si, elimínalo!',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.experienciaService.delete(id).subscribe(data => {
          console.log(data);
          this.experienciaService.obtenerExperiencia().subscribe(dato => {
            dato = dato.sort((a, b) => this.convertirFecha(b.hasta).getTime() - this.convertirFecha(a.hasta).getTime());
            this.listaExperiencia = dato;
          });
        });
        Swal.fire({
          title: '¡Eliminado!',
          text: 'La experiencia fue eliminada.',
          icon: 'success',
          iconColor: 'aqua',
          color: 'red',
          background: 'black',
          showConfirmButton: false,
          timer: 2500
        }
        )
      }
    })
  }

  public editar(exp: experiencia) {
    localStorage.setItem("id", exp.id.toString());
    this.router.navigate(["agregar-experiencia"])
  }


  convertirFecha(fechaString: any) {
    var fechaSp = fechaString.split("-");
    var anio = 2022;
    var mes = 1;
    var dia = 1;
    if (fechaString.toLowerCase().startsWith("actual")) {
      return new Date();
    }
    if (fechaSp.length == 3) {
      anio = fechaSp[2];
      mes = fechaSp[1];
      dia = fechaSp[0];
    }
    if (fechaSp.length == 2) {
      anio = fechaSp[1];
      mes = fechaSp[0];
    }
    if (fechaSp.length == 1) {
      anio = fechaSp;
    }

    return new Date(anio, mes, dia);
  }


}
