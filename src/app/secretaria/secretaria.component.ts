import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ReclamoService } from '../services/reclamo.service';
import { UsuarioService } from '../services/usuario.service';
import { Reclamos } from '../Plantilla/reclamos';
import { ResourceLoader } from '@angular/compiler';

@Component({
  selector: 'app-secretaria',
  templateUrl: './secretaria.component.html',
  styleUrls: ['./secretaria.component.css'],
  providers: [ReclamoService, UsuarioService]
})
export class SecretariaComponent implements OnInit {
  public rut:string;
  public nuevoReclamo: Reclamos;
  public admini:any;
  public resultado:any;
  public reclamos:any;
  public nuevoAdmin:any;
  constructor(private _route: ActivatedRoute, 
    private _router: Router, private _reclamoService: ReclamoService, private _usuarioService: UsuarioService) {
      this._usuarioService.VerAdmin().subscribe(
        request => {
          this.resultado=request;
          console.log(request);
          for(var admin of this.resultado)
          { 
            if(admin.usuario==="administrador")
          {
            //console.log(admin);
            this.admini=this.resultado;
          }
        }
          console.log(this.admini);
        },
        error => {
          console.log(<any>error);
  
  
        }
      )
      this._reclamoService. VerReclamosSecre().subscribe(
        response => {
          this.reclamos=response;
          console.log(response);
          for(var reclamos of response)
          { 
            reclamos=this.resultado;
        }
          console.log("reclamos: ",this.reclamos);
        },
        error => {
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

  Actualizar(item:any)
  {
    //this.nuevoReclamo = new Reclamos(item._id,item.fecha,item.nombre,item.telefono,item.email,this.nuevoAdmin,item.direccion,item.problema,item.estado,item.solucion);
console.log("el rut es",this.rut);
    console.log("se presiono el objeto",item);
    
    this._reclamoService. UpdateReclamo(item).subscribe(
      response => {
        console.log(response);
      },
      error => {
        console.log(<any>error);


      }
   
    )
    location.reload();
 
  }

}
