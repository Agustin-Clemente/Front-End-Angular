import { Component, OnInit } from '@angular/core';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { educacion } from 'src/app/model/educacion.model';
import { EducacionService } from 'src/app/services/educacion.service';
import { TokenService } from 'src/app/services/token.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-educacion',
  templateUrl: './educacion.component.html',
  styleUrls: ['./educacion.component.css']
})
export class EducacionComponent implements OnInit {

  public listaEducacion: educacion[] = [];

  isAdmin = false;
  roles: string[];

  fatrashcan = faTrash;
  fapen = faPen;


  constructor(private educacionService: EducacionService, private tokenServ: TokenService) {
  }

  ngOnInit(): void {
    this.educacionService.obtenerEducacion().subscribe(data => {
      data = data.sort((a, b) => this.convertirFecha(b.hasta).getTime() - this.convertirFecha(a.hasta).getTime());
      this.listaEducacion = data;
    })

    this.roles = this.tokenServ.getAuthorities();
    this.roles.forEach(rol => {
      if (rol === 'ROLE_ADMIN') {
        this.isAdmin = true;
      }
    });
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
        this.educacionService.delete(id).subscribe(data => {
          console.log(data);
          this.educacionService.obtenerEducacion().subscribe(dato => {
            this.listaEducacion = dato;
          });
        });
        Swal.fire({
          title: '¡Eliminado!',
          text: 'La educacion fue eliminada.',
          icon: 'success',
          iconColor: 'aqua',
          color: 'red',
          background: 'black',
          showConfirmButton: false,
          timer: 2500
        })
      }
    })
  }

  public traerLista() {
    this.educacionService.obtenerEducacion().subscribe(data => {
      data = data.sort((a, b) => this.convertirFecha(b.hasta).getTime() - this.convertirFecha(a.hasta).getTime());
      this.listaEducacion = data;
    });
  }


  public editar(edu: educacion) {
    localStorage.setItem("id", edu.id.toString());
  }

  convertirFecha(fechaString) {
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
