import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable()
export class ComunidadService {
    public url: string;
    constructor(public _http: HttpClient) {
        //this.url="http://192.168.100.6:3000/";
        this.url="http://localhost:3000/";
    }
    VerComunidades(rut): Observable<any> {
        let params = JSON.stringify(rut);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.post(this.url + 'comunadmin', params, { headers: headers });
     
    }
    AddComun(comunidad: any): Observable<any> {
        let params = JSON.stringify(comunidad);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.post(this.url + 'comunidad', params, { headers: headers });
    }

    DeleteComun(id:any):Observable<any>{
        let headers=new HttpHeaders().set('Content-Type','application/json');
    
        return this._http.delete(this.url+'comunidad', {headers:headers});
    }
    
    UpdateComun(comunidad:any):Observable<any>{
        let params=JSON.stringify(comunidad);
        let headers=new HttpHeaders().set('Content-Type','application/json');
    
        return this._http.put(this.url+'comunidad',params, {headers:headers});
    }
}