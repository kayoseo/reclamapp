import { Component, OnInit } from '@angular/core';
import {Administrador} from '../Plantilla/administrador';
import {Comunidad} from '../Plantilla/comunidad';
import { AdministradorComponent } from '../administrador/administrador.component';


@Component({
  selector: 'app-gerente',
  templateUrl: './gerente.component.html',
  styleUrls: ['./gerente.component.css']
})
export class GerenteComponent implements OnInit {
public opcion:string;
public accion:string;
public nuevoAdmin: Administrador;
public nuevaComun:Comunidad;
//public nuevoEdificio:any;
public repetir:any;
public numeros:number;
  constructor() { 

    this.opcion='nada';
    this.accion='nada';
    this.nuevoAdmin=new Administrador('','','','');
    this.nuevaComun=new Comunidad('','','',[]);
    //this.nuevoEdificio=new Array('');
  }

  ngOnInit() {
  }

  cambiarOp(option:string)
  {
    this.opcion=option;
    console.log("la opcion marcada es",this.opcion);
  }
  cambiarAc(action:string)
  {
    this.accion=action;
    console.log("la accion marcada es",this.accion);
  }

  onSubmit()
  {
    console.log(this.nuevoAdmin);
    //console.log(this.nuevoEdificio);
    console.log(this.nuevaComun);
  }

  asignar(numeross)
  {
    this.numeros=numeross;
    this.repetir=new Array(this.numeros);
  }

}
