import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { educacion } from '../model/educacion.model';

@Injectable({
  providedIn: 'root'
})
export class EducacionService {

  url= 'http://localhost:8080/';

  constructor(private http:HttpClient) { }

  public obtenerEducacion():Observable<educacion[]>{
    return this.http.get<educacion[]>(this.url + 'ver/educacion');
  }


}