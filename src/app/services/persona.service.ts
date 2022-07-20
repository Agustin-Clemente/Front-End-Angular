import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { persona } from '../model/persona.model';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  //url = 'http://localhost:8080/';
  url = 'https://miportfolio-agustinclemente.herokuapp.com/';

  constructor(private http: HttpClient) { }

  public getPersona(): Observable<persona> {
    return this.http.get<persona>(this.url + 'buscar/persona/2');
  }

  public buscarPersona(id: number): Observable<persona> {
    return this.http.get<persona>(`${this.url}buscar/persona/${id}`);
  }

  public editarPersona(id: number, per: persona): Observable<Object> {
    return this.http.put(`${this.url}editar/persona/${id}`, per);
  }

  public editarAcercaDe(id: number, per: persona): Observable<Object> {
    return this.http.put(`${this.url}editar/acercade/${id}`, per);
  }
}
