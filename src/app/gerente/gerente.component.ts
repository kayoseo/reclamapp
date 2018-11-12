import { Component, OnInit } from '@angular/core';
import {Usuario} from '../Plantilla/usuario';
import {Comunidad} from '../Plantilla/comunidad';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {ComunidadService} from '../services/comunidad.service';
import { ReclamoService } from '../services/reclamo.service';
import { UsuarioService } from '../services/usuario.service';


@Component({
  selector: 'app-gerente',
  templateUrl: './gerente.component.html',
  styleUrls: ['./gerente.component.css'],
  providers:[ComunidadService]
})
export class GerenteComponent implements OnInit {
public opcion:string;
public accion:string;
public nuevoUsuario: Usuario;
public nuevaComun:Comunidad;
//public nuevoEdificio:any;
public repetir:any;
public numeros:number;

public rut:string;

public comunidades:any;

  constructor(private _route: ActivatedRoute, 
    private _router: Router, private _comunidadService:ComunidadService ) { 

    this.opcion='nada';
    this.accion='nada';
    this.nuevoUsuario=new Usuario('','','','');
    this.nuevaComun=new Comunidad('','','',[]);
    //this.nuevoEdificio=new Array('');

  //buscando comunidades
    this._comunidadService.VerComunidades(this.rut).subscribe(
      response => {
        console.log(response.data);
        this.comunidades=response.data;
      },
      error=>{
        console.log(<any>error);
       
        
      }
    )
  }

  ngOnInit() {
    this._route.params.subscribe((params: Params) =>{
      this.rut=params.rut;
      console.log(this.rut);
    });
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
    console.log(this.nuevoUsuario);
    //console.log(this.nuevoEdificio);
    console.log(this.nuevaComun);
  }

  onComuni(form)
  {
    this._comunidadService.AddComun(this.nuevaComun).subscribe(
      response => {
        console.log(response.data);
      },
      error=>{
        console.log(<any>error);
       
        
      }
    )
  }

  asignar(numeross)
  {
    this.numeros=numeross;
    this.repetir=new Array(this.numeros);
  }

}
