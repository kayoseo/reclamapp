import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable} from 'rxjs';
import { RequestOptions, RequestMethod } from '@angular/http';

@Injectable()
export class ReclamoService {
    public url: string;
    constructor(
        public _http: HttpClient
    ) {
        this.url="http://localhost:3000/";
    }
    VerReclamo(id): Observable<any> {
        return this._http.get(this.url + 'reclamo/' + id);
    }

    VerReclamosAdmin(rut): Observable<any> {
        return this._http.get(this.url + 'reclamo/' + rut);
    }

   

    AddReclamo(reclamo:any):Observable<any>{
        let params=JSON.stringify(reclamo);
        console.log(params);
        let headers=new HttpHeaders().set('Content-Type','application/json');
    
        return this._http.post(this.url+'reclamo/',params, {headers:headers});
    }

    DeleteReclamo(id: any): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json');

        return this._http.delete(this.url + 'reclamo/', { headers: headers });
    }

    UpdateReclamo(reclamo: any): Observable<any> {
        let params = JSON.stringify(reclamo);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');

        return this._http.put(this.url + 'reclamo/', params, { headers: headers });
    }
}