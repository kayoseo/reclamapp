import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ReclamoService{
    public url:string;
    constructor(
        public _http: HttpClient
    ){
        this.url="http://reqres.in/";
    }
VerReclamo(id): Observable<any>{
    return this._http.get(this.url+'api/users/'+id);
}

VerReclamosAdmin(rut): Observable<any>{
    return this._http.get(this.url+'api/users/'+rut);
}

AddReclamo(reclamo:any):Observable<any>{
    let params=JSON.stringify(reclamo);
    let headers=new HttpHeaders().set('Content-Type','application/json');

    return this._http.post(this.url+'api/users',params, {headers:headers});
}

DeleteReclamo(id:any):Observable<any>{
    let headers=new HttpHeaders().set('Content-Type','application/json');

    return this._http.delete(this.url+'api/users', {headers:headers});
}

UpdateReclamo(reclamo:any):Observable<any>{
    let params=JSON.stringify(reclamo);
    let headers=new HttpHeaders().set('Content-Type','application/json');

    return this._http.put(this.url+'api/users',params, {headers:headers});
}
}