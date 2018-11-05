import { Component, OnInit } from '@angular/core';
import {Reclamos} from '../Plantilla/reclamos';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.component.html',
  styleUrls: ['./administrador.component.css']
})
export class AdministradorComponent implements OnInit {
  public reclamos: Array<Reclamos>;
  public fecha:Date;
  public fechan:any;
  public indices:number;

  public rut:string;

  constructor(private _route: ActivatedRoute, 
    private _router: Router) { 
     this.fechan=Date.now();
  console.log(this.fechan);
    this.fecha=new Date();
    this.reclamos=[
      new Reclamos('15547',this.fecha,'12 horas 15 minutos','El Bosque sur','Calle 2 Torre A dpto 502','Jorge','No hay agua caliente','En proceso'),
      new Reclamos('15547',this.fecha,'2 horas','Los Talas','Calle 43 Torre A dpto 809','Juan Ra','Sin luz','En proceso')
    ];
  }

  mostrarDetalle(indice)
  {
    this.indices=indice;
    console.log("el index es:", this.indices);
  }
  ngOnInit() {
    this._route.params.subscribe((params: Params) =>{
      this.rut=params.rut;
      console.log(this.rut);
    });
  }

}
