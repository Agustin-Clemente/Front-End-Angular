import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/model/usuario';
import { AutenticacionService } from 'src/app/services/autenticacion.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLogged: boolean = false;
  isLoginFail: boolean = false;
  usuario: Usuario;
  username: string;
  password: string;
  roles: string[] = [];
  error: string;

  constructor(private tokenService: TokenService, private autenticacionServ: AutenticacionService, private route: Router) {

  }

  ngOnInit(): void {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
      this.isLoginFail = false;
      this.roles = this.tokenService.getAuthorities();
    }
  }

  onLogin(): void {
    this.usuario = new Usuario(this.username, this.password);
    this.autenticacionServ.login(this.usuario).subscribe(data => {
      this.isLogged = true;
      this.isLoginFail = false;

      this.tokenService.setToken(data.token);
      this.tokenService.setUsername(data.username);
      this.tokenService.setAuthorities(data.authorities);
      this.roles = data.authorities;
      this.route.navigate(['/portfolio'])

    }
      , err => {
        this.isLogged = false;
        this.isLoginFail = true;
        this.error = err.error.message;
        console.log(err.error.message);

      })
  }

}
