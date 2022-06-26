import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AutenticacionService } from './autenticacion.service';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})

export class InterceptorService implements HttpInterceptor{

  constructor(private tokenServ: TokenService) { }
  //constructor(private autenticacionServ:AutenticacionService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let intReq = req;

    const token= this.tokenServ.getToken();

    if (token != null){
      intReq = req.clone({headers: req.headers.set('Authorization', 'Bearer ' + token)});
    }
    
    return next.handle(intReq);

    /*
    var currentUser= this.autenticacionServ.usuarioAutenticado;

    if(currentUser && currentUser.accessToken){
      req=req.clone({
        setHeaders:{
          Authorization: `Bearer ${currentUser.accessToken}`
        }
      })
    }

    console.log ("Interceptor está corriendo " + JSON.stringify(currentUser));
    return next.handle(req)
    */
  }
  
}

export const interceptorProvider = [{provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true}];
