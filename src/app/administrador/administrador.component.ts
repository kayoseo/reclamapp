import { Component, OnInit } from '@angular/core';
import {Reclamos} from '../Plantilla/reclamos';
import {Comunidad} from '../Plantilla/comunidad';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {ComunidadService} from '../services/comunidad.service';
import {ReclamoService} from '../services/reclamo.service';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.component.html',
  styleUrls: ['./administrador.component.css'],
  providers:[ComunidadService,ReclamoService,UsuarioService]
})
export class AdministradorComponent implements OnInit {
  public reclamos: Array<Reclamos>;
  public fecha:Date;
  public fechan:any;
  public indices:number;
  public usuario:any;

  public rut:string;
  public comunidades: Comunidad;
  public nombre:any;
  public arreglo:any;
  public actualizar: boolean;
  public nombreComunidad:any;
  

  constructor(private _route: ActivatedRoute, 
    private _router: Router,private _usuarioService: UsuarioService,private _comunidadService:ComunidadService, private _reclamoService:ReclamoService) { 
     this.usuario=0;
     this.actualizar= true;
      this._route.params.subscribe((params: Params) =>{
        this.rut=params.rut;
        console.log(this.rut);
      });
      //buscando nombre del usuario para el respectivo id
      this._usuarioService.VerUsuario(this.rut).subscribe(
        response => {
          console.log("usuario es:",response);
          this.usuario=response.nombre;
          console.log("nombre:",this.usuario);
          this.Recuperar(this.usuario);
        },
        error=>{
          console.log(<any>error);
         }
      )
      
     
     
    
      this.fechan=Date.now();
  console.log(this.fechan);
    this.fecha=new Date();
    /*this.reclamos=[
      new Reclamos('',this.fecha,'','','','','','','','',''),
      new Reclamos('',this.fecha,'','','','','','','','','')
    ];*/


  }

  mostrarDetalle(indice)
  {
    this.indices=indice;
    console.log("el index es:", this.indices);
  }
  ngOnInit() {
    
  }

  Recuperar(usuario)
  {
    this.nombre = 
      {
        'nombre':usuario
                  };
                
                  this.Comunidad();
    //buscando reclamos
    console.log("nombre:",this.nombre);
    this._reclamoService.VerReclamosAdmin(this.nombre).subscribe(
      response => {
        console.log("reclamo son:",response);
        this.reclamos=response;
        console.log("los reclamo son:",this.reclamos);
      },
      error=>{
        console.log(<any>error);
       }
    )
  
  }
 
  
Comunidad()
{
  /*
  this.arreglo=["A","B","C","D"];
  this.comunidades=
    new Comunidad('San Bernardo','san bernardo 14','admin 3',this.arreglo);
    
  
  this._comunidadService.AddComun(this.comunidades).subscribe(
    response => {
      console.log("la comunidad creada es:",response);
      this.comunidades=response;
    },
    error=>{
      console.log(<any>error);
     
      
    }
*/

this._comunidadService.VerComunidades(this.nombre).subscribe(
      response => {
        console.log("las comunidades son:",response);
        this.comunidades=response;
        console.log("los comunidades son:",this.comunidades);
      },
      error=>{
        console.log(<any>error);
       }
    )
  
  
}

Actualizar(item:any)
  {
    //this.nuevoReclamo = new Reclamos(item._id,item.fecha,item.nombre,item.telefono,item.email,this.nuevoAdmin,item.direccion,item.problema,item.estado,item.solucion);
//console.log("el rut es",this.rut);
item.comunidad=this.nombreComunidad;
    console.log("se presiono el objeto",item);
    
    this._reclamoService. UpdateReclamo(item).subscribe(
      response => {
        console.log(response);
      },
      error => {
        console.log(<any>error);
        this.actualizar=false;
        

      }
   
    )
    }
}
