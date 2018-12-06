import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable} from 'rxjs';
import { RequestOptions, RequestMethod } from '@angular/http';

@Injectable()
export class EncuestaService {
    public url: string;
    constructor(
        public _http: HttpClient
    ) {
        //this.url="http://192.168.43.238:3000/";
        this.url="http://localhost:3000/";
    }

    VerEncuesta(): Observable<any> {
        return this._http.get(this.url + 'encuesta');
    }

   

    AddEncuesta(encuesta:any):Observable<any>{
        let params=JSON.stringify(encuesta);
        //console.log(params);
        let headers=new HttpHeaders().set('Content-Type','application/json');
    
        return this._http.post(this.url+'encuesta',params, {headers:headers});
    }

    
}