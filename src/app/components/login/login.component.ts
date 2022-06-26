import { jsDocComment } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
//import { timeStamp } from 'console';
import { Usuario } from 'src/app/model/usuario';
import { AutenticacionService } from 'src/app/services/autenticacion.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  //form:FormGroup;

  isLogged: boolean = false;
  isLoginFail: boolean = false;
  usuario: Usuario;
  username: string;
  password: string;
  roles: string[]=[];
  error:string;

  constructor(private tokenService:TokenService, private autenticacionServ: AutenticacionService, private route:Router) { 
    
  }
/*
  constructor(private formBuilder: FormBuilder, private autenticacionServ: AutenticacionService, private route:Router) { 
    this.form=this.formBuilder.group({
      username:['',[Validators.required]],
      password:['',Validators.required]
    })
  }
*/
  ngOnInit(): void {
    if (this.tokenService.getToken()){
      this.isLogged=true;
      this.isLoginFail=false;
      this.roles= this.tokenService.getAuthorities();
    }
  }

  onLogin():void{
    this.usuario = new Usuario(this.username,this.password);
    this.autenticacionServ.login(this.usuario).subscribe(data =>{
      this.isLogged = true;
      this.isLoginFail=false;

      this.tokenService.setToken(data.token);
      this.tokenService.setUsername(data.username);
      this.tokenService.setAuthorities(data.authorities);
      this.roles=data.authorities;
      this.route.navigate(['/portfolio'])
    
    }
    , err=> {
      this.isLogged = false;
      this.isLoginFail = true;
      this.error = err.error.message;
      console.log (err.error.message);
      
    })
  }

  /*
  get Username(){
    return this.form.get('username');
  }

  get Password(){
    return this.form.get('password');
  }

  onEnviar(event:Event){
    event.preventDefault;
    this.autenticacionServ.iniciarSesion(this.form.value).subscribe(data=>{
      console.log("Data: " + JSON.stringify(data));
      this.route.navigate(['/portfolio'])
    })
  }
*/
}
