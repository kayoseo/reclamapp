import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class UsuarioService{
    public url:string;
    constructor(
        public _http: HttpClient
    ){
        this.url="http://reqres.in/";
    }
VerUsuario(id): Observable<any>{
    return this._http.get(this.url+'api/users/'+id);
}

AddUsuario(usuario:any):Observable<any>{
    let params=JSON.stringify(usuario);
    let headers=new HttpHeaders().set('Content-Type','application/json');

    return this._http.post(this.url+'api/users',params, {headers:headers});
}

DeleteUsuario(id:any):Observable<any>{
    let headers=new HttpHeaders().set('Content-Type','application/json');

    return this._http.delete(this.url+'api/users', {headers:headers});
}

UpdateUsuario(usuario:any):Observable<any>{
    let params=JSON.stringify(usuario);
    let headers=new HttpHeaders().set('Content-Type','application/json');

    return this._http.put(this.url+'api/users',params, {headers:headers});
}
}