import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    Swal.fire({
      position: 'center',
      icon: 'warning',
      title: 'Cargando, por favor espere',
      text: 'Esto puede demorar varios minutos',
      color: 'black',
      background: 'aqua',
      showConfirmButton: true,
      iconColor: 'black',
      confirmButtonColor: 'black'
    })
  }
}

