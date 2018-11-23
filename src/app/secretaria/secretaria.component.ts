import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ReclamoService } from '../services/reclamo.service';
import { UsuarioService } from '../services/usuario.service';
import { CorreoService } from '../services/correo.service';
import { Reclamos } from '../Plantilla/reclamos';


@Component({
  selector: 'app-secretaria',
  templateUrl: './secretaria.component.html',
  styleUrls: ['./secretaria.component.css'],
  providers: [ReclamoService, UsuarioService, CorreoService]
})
export class SecretariaComponent implements OnInit {
  public rut: string;
  public nuevoReclamo: Reclamos;
  public admini: any;
  public resultado: any;
  public reclamos: any;
  public nuevoAdmin: any;
  public actualizar: boolean;
  public DatosCorreo: any;
  constructor(private _route: ActivatedRoute,
    private _router: Router, private _reclamoService: ReclamoService, private _usuarioService: UsuarioService, private _correoService: CorreoService) {
    this.actualizar = true;
    this._usuarioService.VerAdmin().subscribe(
      request => {
        this.resultado = request;
        console.log(request);
        for (var admin of this.resultado) {
          if (admin.usuario === "administrador") {
            //console.log(admin);
            this.admini = this.resultado;
          }
        }
        console.log(this.admini);
      },
      error => {
        console.log(<any>error);


      }
    )
    this._reclamoService.VerReclamosSecre().subscribe(
      response => {
        this.reclamos = response;
        console.log(response);
        for (var reclamos of response) {
          reclamos = this.resultado;
        }
        console.log("reclamos: ", this.reclamos);
      },
      error => {
        console.log(<any>error);


      }
    )
  }

  ngOnInit() {
    this.rut = localStorage.getItem("rut");
    /*this._route.params.subscribe((params: Params) => {
      this.rut = params.rut;
      console.log(this.rut);
    });*/


  }

  Actualizar(item: any, indice: any) {
    //this.nuevoReclamo = new Reclamos(item._id,item.fecha,item.nombre,item.telefono,item.email,this.nuevoAdmin,item.direccion,item.problema,item.estado,item.solucion);
    console.log("el rut es", this.rut);
    console.log("se presiono el objeto", item);

    this._reclamoService.UpdateReclamo(item).subscribe(
      response => {
        console.log(response);
        this.correoAdmin(item);
      },
      error => {
        console.log(<any>error);
        this.actualizar = false;

      }

    )
    this.reclamos.splice(indice, 1);

  }

  borrarStorage() {
    localStorage.clear();
    this._router.navigate(['/login'])

  }

  correoAdmin(item) {
    for (var admin of this.admini) {
      if (admin.nombre == item.administrador) {
        this.DatosCorreo =
          {
            'nombre': admin.nombre,
            '_id': item._id,
            'email': admin.mail
          };
      }
    }
    this._correoService.reclamoadministrador(this.DatosCorreo).subscribe(
      response => {
        console.log(response);
      },
      error => {
        console.log(<any>error);
        

      }

    )
  }
}
