import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Jwt } from '../model/jwt';
import { Usuario } from '../model/usuario';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {
  //url = "http://localhost:8080/auth/login"
  url = "https://miportfolio-agustinclemente.herokuapp.com/auth/login"
  constructor(private http: HttpClient) {
    console.log("El servicio de auth está corriendo");
  }

  public login(usuario: Usuario): Observable<Jwt> {
    return this.http.post<Jwt>(this.url, usuario);
  }
}
