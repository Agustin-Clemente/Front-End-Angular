import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Skill } from '../model/skill';

@Injectable({
  providedIn: 'root'
})
export class SkillService {

  //private url = 'http://localhost:8080/';
  //url = 'https://miportfolio-agustinclemente.herokuapp.com/';
  //url = 'https://portfoliowebfullstack-production.up.railway.app/';
  //url = 'https://backap-yjd8.onrender.com/'
  //url= 'https://mi-portfolio-u8ia.onrender.com/'
  url= 'https://mi-portfolio-u8ia.onrender.com/'
  //url= 'https://backend-ap-uyzs.onrender.com/'
  
  constructor(private http: HttpClient) { }

  public traerSkills(): Observable<Skill[]> {
    return this.http.get<Skill[]>(`${this.url}ver/skills`);
  }

  public buscarSkill(id: number): Observable<Skill> {
    return this.http.get<Skill>(`${this.url}buscar/skill/${id}`);
  }

  public delete(id: number): Observable<Object> {
    return this.http.delete(`${this.url}delete-skill/${id}`);
  }

  public crearSkill(s: Skill): Observable<Object> {
    return this.http.post(`${this.url}new/skill`, s);

  }

  public editarSkill(id: number, s: Skill): Observable<Object> {
    return this.http.put(`${this.url}editar/skill/${id}`, s);
  }
}
