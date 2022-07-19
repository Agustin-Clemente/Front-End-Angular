import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { experiencia } from 'src/app/model/experiencia.model';
import { ExperienciaService } from 'src/app/services/experiencia.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agregar-experiencia',
  templateUrl: './agregar-experiencia.component.html',
  styleUrls: ['./agregar-experiencia.component.css']
})
export class AgregarExperienciaComponent implements OnInit {

  id: number;

  exp: experiencia = new experiencia();

  displayStyle = "block";

  constructor(private experienciaserv: ExperienciaService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.id = this.route.snapshot.params['id'];
    this.experienciaserv.buscarExperiencia(this.id).subscribe(dato => {
      this.exp = dato;
    })
  }

  volverAHome() {
    this.router.navigate(['portfolio']);
  }

  public editarExp() {
    Swal.fire({
      title: '¿Quieres guardar los cambios?',
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      denyButtonText: `No guardar`,
      cancelButtonText: 'Cancelar',
      color: 'red',
      background: 'black'
    }).then((result) => {
      if (result.isConfirmed) {
        this.experienciaserv.editarExp(this.exp.id, this.exp).subscribe(() => {
          this.volverAHome();
        })
        Swal.fire({
          title: 'Los cambios se guardaron con éxito',
          icon: 'success',
          color: 'green',
          background: 'black',
          confirmButtonColor: 'green'
        })
      } else if (result.isDenied) {
        Swal.fire('No se guardaron los cambios', '', 'info')
      }
    })
  }

  openPopup() {
    this.displayStyle = "block";
  }
  closePopup() {
    this.volverAHome();
  }
}