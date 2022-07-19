import { Component, OnInit } from '@angular/core';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Skill } from 'src/app/model/skill';
import { SkillService } from 'src/app/services/skill.service';
import { TokenService } from 'src/app/services/token.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {

  public listaSkills: Skill[];

  id: number;

  skill: Skill = new Skill();
  nuevaSkill: Skill = new Skill();

  roles: string[];

  isAdmin = false;

  fatrashcan = faTrash;
  fapen = faPen;

  mostrar = false;

  show = false;

  constructor(private skillService: SkillService, private tokenServ: TokenService) { }

  ngOnInit(): void {

    this.skillService.traerSkills().subscribe(dato => {
      this.listaSkills = dato;
    })

    this.roles = this.tokenServ.getAuthorities();
    this.roles.forEach(rol => {
      if (rol === 'ROLE_ADMIN') {
        this.isAdmin = true;
      }
    });
  }

  public showModal() {
    this.show = true;
  }

  public hideModal() {
    this.show = false;
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
        this.skillService.delete(id).subscribe(data => {
          console.log(data);
          this.skillService.traerSkills().subscribe(dato => {
            this.listaSkills = dato;
          });
        });
        Swal.fire({
          title: '¡Eliminado!',
          text: 'Skill eliminada.',
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

  public abrir(id: number) {
    this.id = id;
    this.skillService.buscarSkill(this.id).subscribe(dato => {
      this.skill = dato;
    })
    this.mostrar = true;
  }

  public cerrar() {
    this.mostrar = false;
  }

  guardar() {
    this.skillService.crearSkill(this.nuevaSkill).subscribe(data => {
      console.log(data);
      this.skillService.traerSkills().subscribe(dato => {
        this.listaSkills = dato;
        this.hideModal();
      });
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Skill creada con éxito',
        color: 'aqua',
        background: 'black',
        showConfirmButton: false,
        timer: 1500
      })
    })
  }

  public editarSkill(skill: Skill) {
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
        this.skillService.editarSkill(skill.id, skill).subscribe(() => {
          this.skillService.traerSkills().subscribe(dato => {
            this.listaSkills = dato;

            this.cerrar();
          })
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
}
