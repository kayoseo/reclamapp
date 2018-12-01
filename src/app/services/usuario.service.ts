import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class UsuarioService{
    public url:string;
    constructor(
        public _http: HttpClient
    ){
        //this.url="http://192.168.100.6:3000/";
        this.url="http://localhost:3000/";
    }
    //Ver datos de un usuario segun su Id de usuario
VerUsuario(id): Observable<any>{
    return this._http.get(this.url+'usuario/'+id);
}
VerAllUsuario(): Observable<any>{
    return this._http.get(this.url+'usuario/');
}

//Ver usuarios de tipo gerente o administrador
VerAdmin(): Observable<any>{
    return this._http.get(this.url+'admin');
}

VerSecretaria():Observable<any>{
    return this._http.get(this.url+'secretarias');
}

AddUsuario(usuario:any):Observable<any>{
    let params=JSON.stringify(usuario);
    let headers=new HttpHeaders().set('Content-Type','application/json');

    return this._http.post(this.url+'usuario/',params, {headers:headers});
}

//LOGIN
Login(usuario:any):Observable<any>{
    let params=JSON.stringify(usuario);
    let headers=new HttpHeaders().set('Content-Type','application/json');

    return this._http.post(this.url+'login',params, {headers:headers});
}

DeleteUsuario(id:any):Observable<any>{
    let headers=new HttpHeaders().set('Content-Type','application/json');

    return this._http.delete(this.url+'usuario/'+id, {headers:headers});
}

UpdateUsuario(usuario:any):Observable<any>{
    let params=JSON.stringify(usuario);
    let headers=new HttpHeaders().set('Content-Type','application/json');

    return this._http.put(this.url+'usuario/'+usuario._id,params, {headers:headers});
}
}