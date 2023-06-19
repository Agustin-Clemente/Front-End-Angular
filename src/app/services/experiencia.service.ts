import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { experiencia } from '../model/experiencia.model';

@Injectable({
  providedIn: 'root'
})
export class ExperienciaService {

  //private url = 'http://localhost:8080/';
  //url = 'https://miportfolio-agustinclemente.herokuapp.com/';
  //url = 'https://portfoliowebfullstack-production.up.railway.app/';
  url = 'https://backap-yjd8.onrender.com/'

  constructor(private http: HttpClient) { }

  public obtenerExperiencia(): Observable<experiencia[]> {
    return this.http.get<experiencia[]>(`${this.url}ver/experiencia`);
  }

  public buscarExperiencia(id: number): Observable<experiencia> {
    return this.http.get<experiencia>(`${this.url}buscar/exp/${id}`);
  }

  public delete(id: number): Observable<Object> {
    return this.http.delete(`${this.url}deleteexp/${id}`);
  }

  agregarExp(exp: experiencia): Observable<Object> {
    return this.http.post(`${this.url}new/experiencia`, exp);
  }

  public editarExp(id: number, exp: experiencia): Observable<Object> {
    return this.http.put(`${this.url}editar/exp/${id}`, exp);
  }






}
