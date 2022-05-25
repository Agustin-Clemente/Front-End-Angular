import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { experiencia } from '../model/experiencia.model';

@Injectable({
  providedIn: 'root'
})
export class ExperienciaService {

  url= 'http://localhost:8080/';

  constructor(private http:HttpClient) { }

  public obtenerExperiencia():Observable<experiencia[]>{
    return this.http.get<experiencia[]>(this.url + 'ver/experiencia');
  }
}
