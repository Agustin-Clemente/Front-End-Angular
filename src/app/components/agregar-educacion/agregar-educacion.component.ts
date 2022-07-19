import { Component, OnInit } from '@angular/core';
import { educacion } from 'src/app/model/educacion.model';
import { EducacionService } from 'src/app/services/educacion.service';
import Swal from 'sweetalert2';
import { EducacionComponent } from '../educacion/educacion.component';

@Component({
  selector: 'app-agregar-educacion',
  templateUrl: './agregar-educacion.component.html',
  styleUrls: ['./agregar-educacion.component.css']
})
export class AgregarEducacionComponent implements OnInit {

  show = false;

  id: number;

  edu: educacion = new educacion();

  public listaEducacion: educacion[] = [];

  constructor(private eduServ: EducacionService, private compo: EducacionComponent) { }

  ngOnInit(): void {
  }

  public showModal() {
    this.show = true;
  }

  volverAHome() {
    this.compo.traerLista();
  }

  crear() {
    this.eduServ.agregarEdu(this.edu).subscribe(data => {
      console.log(data);
      this.eduServ.obtenerEducacion().subscribe(() => {

        this.hideModal();
        this.volverAHome();
      });
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Educación creada con éxito',
        color: 'aqua',
        background: 'black',
        showConfirmButton: false,
        timer: 1500
      })
    })
  }

  hideModal() {
    this.show = false;
  }

}
