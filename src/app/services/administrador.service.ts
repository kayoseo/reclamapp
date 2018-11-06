import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable()
export class AdministradorService {
    public url: string;
    constructor(public _http: HttpClient) {
        this.url = "http://reqres.in/";
    }
    VerAdmin(): Observable<any> {
        return this._http.get(this.url + 'api/users/');
    }
    AddAdmin(administrador: any): Observable<any> {
        let params = JSON.stringify(administrador);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.post(this.url + 'api/users', params, { headers: headers });
    }

    DeleteAdmin(id:any):Observable<any>{
        let headers=new HttpHeaders().set('Content-Type','application/json');
    
        return this._http.delete(this.url+'api/users', {headers:headers});
    }
    
    UpdateAdmin(administrador:any):Observable<any>{
        let params=JSON.stringify(administrador);
        let headers=new HttpHeaders().set('Content-Type','application/json');
    
        return this._http.put(this.url+'api/users',params, {headers:headers});
    }
}