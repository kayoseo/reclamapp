import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class UsuarioService{
    public url:string;
    constructor(
        public _http: HttpClient
    ){
        this.url="http://localhost:3000/";
    }
VerUsuario(): Observable<any>{
    return this._http.get(this.url+'usuario');
}

VerAdmin(): Observable<any>{
    return this._http.get(this.url+'admin');
}

AddUsuario(usuario:any):Observable<any>{
    let params=JSON.stringify(usuario);
    let headers=new HttpHeaders().set('Content-Type','application/json');

    return this._http.post(this.url+'usuario',params, {headers:headers});
}

//LOGIN
Login(usuario:any):Observable<any>{
    let params=JSON.stringify(usuario);
    let headers=new HttpHeaders().set('Content-Type','application/json');

    return this._http.post(this.url+'login',params, {headers:headers});
}

DeleteUsuario(id:any):Observable<any>{
    let headers=new HttpHeaders().set('Content-Type','application/json');

    return this._http.delete(this.url+'usuario', {headers:headers});
}

UpdateUsuario(usuario:any):Observable<any>{
    let params=JSON.stringify(usuario);
    let headers=new HttpHeaders().set('Content-Type','application/json');

    return this._http.put(this.url+'usuario',params, {headers:headers});
}
}