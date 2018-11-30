import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {ReclamoService} from '../services/reclamo.service';


@Component({
  selector: 'app-ver-reclamo',
  templateUrl: './ver-reclamo.component.html',
  styleUrls: ['./ver-reclamo.component.css'],
  providers:[ReclamoService]
})
export class VerReclamoComponent implements OnInit {

  public id_reclamo:string;
  public reclamo:any;
  public existe:boolean;
  public fecha:string;
  constructor(private _route: ActivatedRoute, 
    private _router: Router,private _reclamoService:ReclamoService
  ) {
   this.existe=true;

  }

  ngOnInit() {
    this._route.params.subscribe((params: Params) =>{
      this.id_reclamo=params.numero;
      console.log(this.id_reclamo);
    });
    this._reclamoService.VerReclamo(this.id_reclamo).subscribe(
      result => {
        this.reclamo=result;
        this.reclamo.fecha=new Date(this.reclamo.fecha);
        this.Convertfecha(this.reclamo.fecha);
        console.log(this.reclamo);
      },
      error=>{
        console.log(<any>error);
        this.existe=false;
      }
    )
  }

  Convertfecha(reclamo)
  {
    var año = reclamo.getFullYear();
    console.log("",año);
    var mes = reclamo.getMonth() + 1;
    console.log("",mes);
    var dia = reclamo.getDate();
    console.log("",dia);
    var minutos = reclamo.getMinutes();
    console.log("",minutos);
    var segundos = reclamo.getSeconds();
    console.log("",segundos);
    var horas=reclamo.getHours();
    console.log("",horas);
    this.fecha= mes+'/'+dia+'/'+año+' '+horas+':'+minutos+':'+segundos;
  }

}
