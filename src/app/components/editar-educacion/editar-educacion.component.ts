import { Component, OnInit } from '@angular/core';
import { educacion } from 'src/app/model/educacion.model';
import Swal from 'sweetalert2';
import { EducacionComponent } from '../educacion/educacion.component';
import { EducacionService } from '../../services/educacion.service';


@Component({
  selector: 'app-editar-educacion',
  templateUrl: './editar-educacion.component.html',
  styleUrls: ['./editar-educacion.component.css']
})
export class EditarEducacionComponent implements OnInit {

  public listaEducacion: educacion[] = [];

  id: number;

  edu: educacion = new educacion();

  show = false;

  constructor(private eduServ: EducacionService, private compo: EducacionComponent) { }

  ngOnInit(): void {
  }

  volverAHome() {
    this.compo.traerLista();
  }

  agregarEdu(edu: educacion) {
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
        this.eduServ.editarEdu(edu.id, edu).subscribe(() => {

          this.hideModal();
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
    });
  }


  public showModal(id: number) {
    this.id = id;
    this.eduServ.buscarEducacion(this.id).subscribe(dato => {
      this.edu = dato;
    })
    this.show = true;
  }

  hideModal() {
    this.show = false;
  }
}



