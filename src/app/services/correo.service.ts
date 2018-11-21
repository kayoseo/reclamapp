import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable} from 'rxjs';
import { RequestOptions, RequestMethod } from '@angular/http';

@Injectable()
export class CorreoService {
    public url: string;
    constructor(
        public _http: HttpClient
    ) {
        //this.url="http://192.168.100.6:3000/";
        this.url="http://localhost:3000/correo/";
    }
   

    correoupdate(datos): Observable<any> {
        let params=JSON.stringify(datos);
        console.log("esto va a mandar el servicio",params);
        let headers=new HttpHeaders().set('Content-Type','application/json');
        return this._http.post(this.url + 'updatereclamo',params, {headers:headers});
    }

    reclamoresidente(datos): Observable<any> {
        let params=JSON.stringify(datos);
        console.log("esto va a mandar el servicio",params);
        let headers=new HttpHeaders().set('Content-Type','application/json');
        return this._http.post(this.url + 'reclamoresidente',params, {headers:headers});
    }

    reclamoadministrador(datos): Observable<any> {
        let params=JSON.stringify(datos);
        console.log("esto va a mandar el servicio",params);
        let headers=new HttpHeaders().set('Content-Type','application/json');
        return this._http.post(this.url + 'reclamoadministrador',params, {headers:headers});
    }

    reclamosecretaria(datos): Observable<any> {
        let params=JSON.stringify(datos);
        console.log("esto va a mandar el servicio",params);
        let headers=new HttpHeaders().set('Content-Type','application/json');
        return this._http.post(this.url + 'reclamosecretaria',params, {headers:headers});
    }

    
}