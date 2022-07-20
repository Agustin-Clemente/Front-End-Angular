import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { proyectos } from '../model/proyectos.model';

@Injectable({
  providedIn: 'root'
})
export class ProyectosService {

  //url = 'http://localhost:8080/';
  url = 'https://miportfolio-agustinclemente.herokuapp.com/';

  constructor(private http: HttpClient) { }

  public obtenerProyectos(): Observable<proyectos[]> {
    return this.http.get<proyectos[]>(this.url + 'ver/proyecto');
  }

  public delete(id: number): Observable<Object> {
    return this.http.delete(`${this.url}deleteproy/${id}`);
  }

  agregarProy(proy: proyectos): Observable<Object> {
    return this.http.post(`${this.url}new/proyecto`, proy);
  }

  public buscarProyecto(id: number): Observable<proyectos> {
    return this.http.get<proyectos>(`${this.url}buscar/proyecto/${id}`);
  }

  public editarProyecto(id: number, proy: proyectos): Observable<Object> {
    return this.http.put(`${this.url}editar/proyecto/${id}`, proy);
  }
}
