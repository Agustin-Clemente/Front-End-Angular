import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { educacion } from '../model/educacion.model';

@Injectable({
  providedIn: 'root'
})
export class EducacionService {

  //url = 'http://localhost:8080/';
  //url = 'https://miportfolio-agustinclemente.herokuapp.com/';
  //url = 'https://portfoliowebfullstack-production.up.railway.app/';
  //url = 'https://backap-yjd8.onrender.com/'
  url= 'https://mi-portfolio-u8ia.onrender.com/'
  //url= 'https://backend-ap-uyzs.onrender.com/'

  constructor(private http: HttpClient) { }

  public obtenerEducacion(): Observable<educacion[]> {
    return this.http.get<educacion[]>(`${this.url}ver/educacion`);
  }

  public delete(id: number): Observable<Object> {
    return this.http.delete(`${this.url}deleteedu/${id}`);
  }

  public buscarEducacion(id: number): Observable<educacion> {
    return this.http.get<educacion>(`${this.url}buscar/edu/${id}`);
  }

  public agregarEdu(edu: educacion): Observable<Object> {
    return this.http.post(`${this.url}new/educacion`, edu);
  }

  public editarEdu(id: number, edu: educacion): Observable<Object> {
    return this.http.put(`${this.url}editar/edu/${id}`, edu);
  }




}
