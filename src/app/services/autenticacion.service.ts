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
  //url = "https://miportfolio-agustinclemente.herokuapp.com/auth/login"
  //url = 'https://portfoliowebfullstack-production.up.railway.app/auth/login';
  //url = 'https://backap-yjd8.onrender.com/auth/login'
  url= 'https://mi-portfolio-u8ia.onrender.com/login'

  constructor(private http: HttpClient) {
    console.log("El servicio de auth está corriendo");
  }

  public login(usuario: Usuario): Observable<Jwt> {
    return this.http.post<Jwt>(this.url, usuario);
  }
}
