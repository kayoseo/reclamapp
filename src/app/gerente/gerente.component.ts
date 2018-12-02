import { Component, OnInit } from '@angular/core';
import { Usuario } from '../Plantilla/usuario';
import { Comunidad } from '../Plantilla/comunidad';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ComunidadService } from '../services/comunidad.service';
import { ReclamoService } from '../services/reclamo.service';
import { UsuarioService } from '../services/usuario.service';
import { CorreoService } from '../services/correo.service'
import { Alert } from 'selenium-webdriver';


@Component({
  selector: 'app-gerente',
  templateUrl: './gerente.component.html',
  styleUrls: ['./gerente.component.css'],
  providers: [ComunidadService, ReclamoService, UsuarioService, CorreoService]
})
export class GerenteComponent implements OnInit {
  public opcion: string;
  public accion: string;
  public nuevoUsuario: Usuario;
  public nuevaComun: Comunidad;
  //public nuevoEdificio:any;
  public repetir: any;
  public numeros: number;
  public fechaDate: any;

  public datosAdministrador: any;

  public idReclamo: any;

  public contador: any;

  public transcurrido: any;

  public reclamos: any;

  public allComunidad: any;

  public rut: string;
  public idDelete: string;

  public comunidades: any;

  public repetido: boolean; // booleano para verificar que no se ingresan datos repetidos de otros usuarios

  public listaUser: any; //de gerentes y administradores
  public allUser: any; //todos los tipos de usuarios
  public resultado: any;

  public nombre: any; //nombre del cual quiero eliminar

  public userEdit: any //nombre del usuario quien deseeo eliminar



  constructor(private _route: ActivatedRoute,
    private _router: Router, private _comunidadService: ComunidadService, private _usuarioService: UsuarioService, private _reclamoService: ReclamoService, private _correoService: CorreoService) {
    this.contador = 0;
    this.opcion = 'nada';
    this.accion = 'nada';
    this.nuevoUsuario = new Usuario('', '@sercolex.cl', '', '');
    this.nuevaComun = new Comunidad('', '', '', []);

    this.traerValoresAllUser();
    this.Recuperar();



  }

  ngOnInit() {
    this.rut = localStorage.getItem("rut");
    /*this._route.params.subscribe((params: Params) => {
      this.rut = params.rut;
      console.log(this.rut);
    });*/
  }

  cambiarOp(option: string) {
    this.opcion = option;
    console.log("la opcion marcada es", this.opcion);
  }
  cambiarAc(action: string) {
    this.accion = action;
    console.log("la accion marcada es", this.accion);
  }

  borrarStorage() {
    localStorage.clear();
    this._router.navigate(['/login'])

  }

  Convertfecha(reclamosAdmin) {

    var msecPerMinute = 1000 * 60;
    var msecPerHour = msecPerMinute * 60;
    var msecPerDay = msecPerHour * 24;

    var horaActual = new Date();

    // Get the difference in milliseconds.
    var diferencia = horaActual.getTime() - reclamosAdmin.getTime();

    // Calculate how many days the interval contains. Subtract that
    // many days from the interval to determine the remainder.
    var days = Math.floor(diferencia / msecPerDay);
    diferencia = diferencia - (days * msecPerDay);

    // Calculate the hours, minutes, and seconds.
    var hours = Math.floor(diferencia / msecPerHour);
    diferencia = diferencia - (hours * msecPerHour);

    var minutes = Math.floor(diferencia / msecPerMinute);
    diferencia = diferencia - (minutes * msecPerMinute);

    var seconds = Math.floor(diferencia / 1000);

    this.transcurrido[this.contador] = days + " días, " + hours + " horas, " + minutes + " minutos, " + seconds + " segundos."


    var año = reclamosAdmin.getFullYear();
    console.log("", año);
    var mes = reclamosAdmin.getMonth() + 1;
    console.log("", mes);
    var dia = reclamosAdmin.getDate();
    console.log("", dia);
    var minutos = reclamosAdmin.getMinutes();
    console.log("", minutos);
    var segundos = reclamosAdmin.getSeconds();
    console.log("", segundos);
    var horas = reclamosAdmin.getHours();
    console.log("", horas);


    this.fechaDate[this.contador] = mes + '/' + dia + '/' + año + ' ' + horas + ':' + minutos + ':' + segundos;
    this.contador = this.contador + 1;


  }


  onSubmit() {

  }

  newComuni(form) {
    this.nuevaComun.nombre=this.nuevaComun.nombre.trim();
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


  asignar(numeros) {
    this.numeros = numeros;
    this.repetir = new Array(this.numeros);
  }
  newUsuario(form) {
    this.repetido = false;
    this.nuevoUsuario.mail = this.nuevoUsuario.mail.toLocaleLowerCase();
    this.nuevoUsuario.mail = this.nuevoUsuario.mail.trim();
    this.nuevoUsuario.nombre = this.nuevoUsuario.nombre.trim();
    
    for (var user of this.allUser) {
      if (user.mail == this.nuevoUsuario.mail) {
        this.repetido = true;
        alert("El correo ingresado ya se encuentra registrado. Para crer un nuevo usuario el nombre y el correo deben ser diferentes para cada usuario ");
      }

      if (user.nombre == this.nuevoUsuario.nombre) {
        this.repetido = true;
        alert("El nombre del empleado ingresado ya se encuentra registrado. Para crer un nuevo usuario el nombre y el correo deben ser diferentes para cada usuario ");
      }
    }
      if (this.repetido == false) {
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
    
  }

  deleteUsuario(usuario) {
    var contador = 0;
    console.log("El nombre a eliminar", usuario);
    for (var reclamo of this.reclamos) {
      if (reclamo.administrador == usuario && reclamo.estado != "Finalizado") {
        reclamo.administrador = "Desconocido";
        this.Actualizar(reclamo);
        alert("Los reclamos que fueron asignados al administrador y no han sido solucionados tendra que derivarlos la secretaria a otro administrador");

      }


    }

    for (var user of this.allUser) {
      if (user.nombre == usuario) {
        this.idDelete = user._id;
        console.log("entrar a borrar");
        this.BorrarUsuarioService(this.idDelete);
        this.allUser.splice(contador, 1);
      }
      contador = contador + 1;
    }

  }

  BorrarUsuarioService(id) {
    this._usuarioService.DeleteUsuario(id).subscribe(
      request => {
        this.resultado = request;
        console.log(request);
        console.log("Usuario Eliminador", this.resultado)
      },
      error => {
        console.log(<any>error);


      }
    )
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

  Comunidad() {


    this._comunidadService.AllComunidades().subscribe(
      response => {
        console.log("las comunidades son:", response);
        this.allComunidad = response;
        console.log("Todas las comunidades son:", this.allComunidad);
      },
      error => {
        console.log(<any>error);
      }
    )


  }

  Recuperar() {


    this.Comunidad();
    //buscando reclamos
    console.log("nombre:", this.nombre);
    this._reclamoService.AllReclamo().subscribe(
      response => {
        console.log("reclamo son:", response);
        this.reclamos = response;
        this.fechaDate = new Array(this.reclamos.length);
        this.transcurrido = new Array(this.reclamos.length);
        for (var reclamo of this.reclamos) {
          reclamo.fecha = new Date(reclamo.fecha);
          this.Convertfecha(reclamo.fecha);

        }
        console.log("los reclamo son:", this.reclamos);
      },
      error => {
        console.log(<any>error);
      }
    )

  }


  Actualizar(item: any) {
    item.fecha = new Date(item.fecha);
    console.log("se presiono el objeto", item);
    this.idReclamo = item._id;
    this._reclamoService.UpdateReclamo(item).subscribe(
      response => {
        console.log(response);
        var año = item.fecha.getFullYear();

        var mes = item.fecha.getMonth() + 1;

        var dia = item.fecha.getDate();

        var minutos = item.fecha.getMinutes();

        var segundos = item.fecha.getSeconds();

        var horas = item.fecha.getHours();

        item.fecha = mes + '/' + dia + '/' + año + ' ' + horas + ':' + minutos + ':' + segundos;
        this.correo(item);
        alert("El reclamo ha sido actualizado y se ha notificado al residente");
      },
      error => {
        console.log(<any>error);


      }

    )
  }
  //aviso al residente
  correo(item) {
    this._correoService.correoupdate(item).subscribe(
      response => {
        console.log(response);
        this.mailAdministrador(item);
      },
      error => {
        console.log(<any>error);

      }

    )
  }

  mailAdministrador(item) {

    this._usuarioService.VerAllUsuario().subscribe(
      response => {
        console.log(response);
        for (var admin of response) {
          console.log(admin);
          if (item.administrador == admin.nombre) {
            this.datosAdministrador =
              {
                'nombre': admin.nombre,
                '_id': this.idReclamo,
                'email': admin.mail
              };
            this.correoAdministraodr(this.datosAdministrador);
          }

        }

      },
      error => {
        console.log(<any>error);
      }
    )
  }

  correoAdministraodr(item) {

    this._correoService.updateadministrador(item).subscribe(
      response => {
        console.log(response);
      },
      error => {
        console.log(<any>error);

      }

    )
  }

  updateUser(usuario) {


    this._usuarioService.UpdateUsuario(usuario).subscribe(
      response => {
        console.log(response);
        alert("El usuario " + usuario.nombre + " fue actualizado");
      },
      error => {
        console.log(<any>error);


      }

    )
  }





}
