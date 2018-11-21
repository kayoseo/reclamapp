import { Component, OnInit } from '@angular/core';
import { Usuario } from '../Plantilla/usuario';
import { Comunidad } from '../Plantilla/comunidad';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ComunidadService } from '../services/comunidad.service';
import { ReclamoService } from '../services/reclamo.service';
import { UsuarioService } from '../services/usuario.service';


@Component({
  selector: 'app-gerente',
  templateUrl: './gerente.component.html',
  styleUrls: ['./gerente.component.css'],
  providers: [ComunidadService, ReclamoService, UsuarioService]
})
export class GerenteComponent implements OnInit {
  public opcion: string;
  public accion: string;
  public nuevoUsuario: Usuario;
  public nuevaComun: Comunidad;
  //public nuevoEdificio:any;
  public repetir: any;
  public numeros: number;

  public rut: string;
  public idDelete: string;

  public comunidades: any;

  public listaUser: any; //de gerentes y administradores
  public allUser: any; //todos los tipos de usuarios
  public resultado: any;

  public nombre: any; //nombre del cual quiero eliminar



  constructor(private _route: ActivatedRoute,
    private _router: Router, private _comunidadService: ComunidadService, private _usuarioService: UsuarioService, private _reclamoService: ReclamoService) {

    this.opcion = 'nada';
    this.accion = 'nada';
    this.nuevoUsuario = new Usuario('', '', '', '');
    this.nuevaComun = new Comunidad('', '', '', []);

    this.traerValoresAllUser();



  }

  ngOnInit() {
    this._route.params.subscribe((params: Params) => {
      this.rut = params.rut;
      console.log(this.rut);
    });
  }

  cambiarOp(option: string) {
    this.opcion = option;
    console.log("la opcion marcada es", this.opcion);
  }
  cambiarAc(action: string) {
    this.accion = action;
    console.log("la accion marcada es", this.accion);
  }

  onSubmit() {

  }

  newComuni(form) {
    this._comunidadService.AddComun(this.nuevaComun).subscribe(
      response => {
        console.log(response);
        alert("Comunidad creada con exito");
      },
      error => {
        console.log(<any>error);
        alert("Existio un problema al crear la comunidad");

      }
    )
  }


  asignar(numeros)
  {
    this.numeros=numeros;
    this.repetir=new Array(this.numeros);
  }
  newUsuario(form) {
    this.nuevoUsuario.mail = this.nuevoUsuario.mail.toLocaleLowerCase();
    this._usuarioService.AddUsuario(this.nuevoUsuario).subscribe(
      response => {
        console.log(response);
        alert("Usuario creado con exito");
        form.reset();
        this.traerValoresAllUser();
      },
      error => {
        console.log(<any>error);
        alert(({
          title: 'Alert!',
          content: 'Existio un problema al crear el usuario',
        })
        );


      }
    )


  }

  deleteUsuario(form) {
    console.log("El nombre a eliminar", this.idDelete);
    this.nombre =
      {
        'nombre': this.idDelete
      };
    this.comunidadAdmin(this.nombre);
  }



  traerValoresAllUser() {

    //Todos los usuarios 
    this._usuarioService.VerAllUsuario().subscribe(
      request => {
        this.resultado = request;
        console.log(request);
        for (var admin of this.resultado) {
          console.log(admin);
          this.allUser = this.resultado;

        }

        console.log("todos los usuarios del sistema son:", this.allUser)
      },
      error => {
        console.log(<any>error);


      }
    )
    //usuarios tipo gerente o administrador
    this._usuarioService.VerAdmin().subscribe(
      request => {
        this.resultado = request;
        console.log(request);
        for (var admin of this.resultado) {
          console.log(admin);
          this.listaUser = this.resultado;

        }

        console.log("los administradores son", this.listaUser);
      },
      error => {
        console.log(<any>error);


      }
    )
  }

  comunidadAdmin(nombre) {

    //buscando comunidades
    this._comunidadService.VerComunidades(nombre).subscribe(
      response => {
        console.log("comunidades asociadas a ese administrador", response);
        this.comunidades = response;
        console.log("valor objeto", this.comunidades[0]);
        if (this.comunidades[0] === undefined) {
          console.log("Se puede eliminar");
        }
        delete this.comunidades;
      },
      error => {
        console.log(<any>error);


      }
    )


  }

 
}
