import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ReclamoService } from '../services/reclamo.service';
import { UsuarioService } from '../services/usuario.service';
import { CorreoService } from '../services/correo.service';
import { Reclamos } from '../Plantilla/reclamos';
import { Alert } from 'selenium-webdriver';


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
  public transcurrido: any;
  public contador: any;
  public fechaDate: any;
  constructor(private _route: ActivatedRoute,
    private _router: Router, private _reclamoService: ReclamoService, private _usuarioService: UsuarioService, private _correoService: CorreoService) {
    this.actualizar = true;
    this.contador = 0;
    this._usuarioService.VerAdmin().subscribe(
      request => {
        this.resultado = request;
        //console.log('los usuarios son',request);
        this.admini = this.resultado;
      },
      error => {
        console.log(<any>error);


      }
    )
    this._reclamoService.VerReclamosSecre().subscribe(
      response => {
        this.reclamos = response;
        //console.log(response);
        this.fechaDate = new Array(this.reclamos.length);
        this.transcurrido = new Array(this.reclamos.length);
        for (var reclamo of this.reclamos) {
          reclamo.fecha = new Date(reclamo.fecha);
          this.Convertfecha(reclamo.fecha);

        }
        //console.log("reclamos: ", this.reclamos);
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
    //console.log("el rut es", this.rut);
    //console.log("se presiono el objeto", item);

    this._reclamoService.UpdateReclamo(item).subscribe(
      response => {
        //console.log(response);
        this.correoAdmin(item);
        alert("Administrador asignado con exito");
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
        //console.log(response);
      },
      error => {
        console.log(<any>error);


      }

    )
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
    //console.log("",año);
    var mes = reclamosAdmin.getMonth() + 1;
    //console.log("",mes);
    var dia = reclamosAdmin.getDate();
    //console.log("",dia);
    var minutos = reclamosAdmin.getMinutes();
    //console.log("",minutos);
    var segundos = reclamosAdmin.getSeconds();
    //console.log("",segundos);
    var horas = reclamosAdmin.getHours();
    //console.log("",horas);


    this.fechaDate[this.contador] = mes + '/' + dia + '/' + año + ' ' + horas + ':' + minutos + ':' + segundos;
    this.contador = this.contador + 1;


  }
}
