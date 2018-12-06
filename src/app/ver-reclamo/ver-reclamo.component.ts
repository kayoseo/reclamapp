import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {ReclamoService} from '../services/reclamo.service';
import {EncuestaService} from '../services/encuesta.service';
import { Encuesta } from '../Plantilla/encuesta';


@Component({
  selector: 'app-ver-reclamo',
  templateUrl: './ver-reclamo.component.html',
  styleUrls: ['./ver-reclamo.component.css'],
  providers:[ReclamoService,EncuestaService]
})
export class VerReclamoComponent implements OnInit {

  public id_reclamo:string;
  public reclamo:any;
  public existe:boolean;
  public fecha:string;
  public encuesta:Encuesta;
  public datosEncuesta:any;

  public Guardar:any;

  public imprime:any;

  public nota:any;
  constructor(private _route: ActivatedRoute, 
    private _router: Router,private _reclamoService:ReclamoService, private _encuestaService:EncuestaService
  ) {
    this.imprime="no";
   this.existe=true;
   this.encuesta = new Encuesta('','','');
   this.Ver();
   this.Guardar="SI";

  }

  ngOnInit() {
    this._route.params.subscribe((params: Params) =>{
      this.id_reclamo=params.numero;
      //console.log(this.id_reclamo);
      this.Reclamos();
    });
    
  }

  Reclamos()
  {
    this._reclamoService.VerReclamo(this.id_reclamo).subscribe(
      result => {
        this.reclamo=result;
        this.reclamo.fecha=new Date(this.reclamo.fecha);
        //console.log(this.reclamo);
        this.Convertfecha(this.reclamo.fecha);
      },
      error=>{
        console.log(<any>error);
        this.existe=false;
      }
    )
  }
Ver()
{
  this._encuestaService.VerEncuesta().subscribe(
    result => {
      this.datosEncuesta=result;
      //console.log("los datos de la encuesta son",this.datosEncuesta);
    },
    error=>{
      console.log(<any>error);
      this.existe=false;
    }
  )
}
Nuevaencuesta(form)
{
  this.encuesta.reclamo=this.reclamo._id;
  this.encuesta.administrador=this.reclamo.administrador;
  for(var item of this.datosEncuesta)
  {
    if(this.encuesta.reclamo== item.reclamo)
  {
    this.Guardar="NO";
  }
}
if(this.Guardar=="NO")
{
  alert("Ya existe una evaluación para este reclamo");
}
else
  {this._encuestaService.AddEncuesta(this.encuesta).subscribe(
    result => {
      //console.log("los datos de la encuesta son",result);
      alert("Los datos de la encuesta fueron guardados correctamente");
    },
    error=>{
      console.log(<any>error);
      this.existe=false;
    }
  )}
}
  Convertfecha(reclamo)
  {
    var año = reclamo.getFullYear();
    //console.log("",año);
    var mes = reclamo.getMonth() + 1;
    //console.log("",mes);
    var dia = reclamo.getDate();
    //console.log("",dia);
    var minutos = reclamo.getMinutes();
    //console.log("",minutos);
    var segundos = reclamo.getSeconds();
    //console.log("",segundos);
    var horas=reclamo.getHours();
    //console.log("",horas);
    this.fecha= mes+'/'+dia+'/'+año+' '+horas+':'+minutos+':'+segundos;
    this.imprime="Si"
  }

}
