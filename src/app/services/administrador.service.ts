import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable()
export class AdministradorService {
    public url: string;
    constructor(public _http: HttpClient) {
        this.url="http://localhost:3000/";
    }
    VerAdmin(): Observable<any> {
        
        return this._http.get(this.url+'usuario');
        
    }
    AddAdmin(administrador: any): Observable<any> {
        let params = JSON.stringify(administrador);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.post(this.url + 'usuario', params, { headers: headers });
    }

    DeleteAdmin(id:any):Observable<any>{
        let headers=new HttpHeaders().set('Content-Type','application/json');
    
        return this._http.delete(this.url+'usuario', {headers:headers});
    }
    
    UpdateAdmin(administrador:any):Observable<any>{
        let params=JSON.stringify(administrador);
        let headers=new HttpHeaders().set('Content-Type','application/json');
    
        return this._http.put(this.url+'usuario',params, {headers:headers});
    }
}