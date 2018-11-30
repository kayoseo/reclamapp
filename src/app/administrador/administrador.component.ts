import { Component, OnInit } from '@angular/core';
import { Reclamos } from '../Plantilla/reclamos';
import { Comunidad } from '../Plantilla/comunidad';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ComunidadService } from '../services/comunidad.service';
import { ReclamoService } from '../services/reclamo.service';
import { UsuarioService } from '../services/usuario.service';
import { CorreoService } from '../services/correo.service';

@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.component.html',
  styleUrls: ['./administrador.component.css'],
  providers: [ComunidadService, ReclamoService, UsuarioService, CorreoService]
})
export class AdministradorComponent implements OnInit {
  public reclamos: Array<Reclamos>;
  public fecha: Date;
  public fechan: any;
  public indices: number;
  public usuario: any;

  public rut: string;
  public comunidades: Comunidad;
  public nombre: any;
  public arreglo: any;
  public actualizar: boolean;
  public nombreComunidad: any;
  public idReclamo: any;
  public fechaDate:any;
  public transcurrido:any;

  public contador:any;

  public correosGerenteSecreataria: any;

  public datosGerente: any; //objeto para enviarlo al servicio de correo del gerente


  constructor(private _route: ActivatedRoute,
    private _router: Router, private _usuarioService: UsuarioService, private _comunidadService: ComunidadService, private _reclamoService: ReclamoService, private _correoService: CorreoService) {
    this.usuario = 0;
    this.actualizar = true;
    this.rut = localStorage.getItem("rut");

 

    this.contador=0;
   
    //buscando nombre del usuario para el respectivo id
    this._usuarioService.VerUsuario(this.rut).subscribe(
      response => {
        console.log("usuario es:", response);
        this.usuario = response.nombre;
        console.log("nombre:", this.usuario);
        this.Recuperar(this.usuario);
      },
      error => {
        console.log(<any>error);
      }
    )




    this.fechan = Date.now();
    console.log(this.fechan);
    this.fecha = new Date();
   


  }

  borrarStorage() {
    localStorage.clear();
    this._router.navigate(['/login'])

  }

  mostrarDetalle(indice) {
    this.indices = indice;
    console.log("el index es:", this.indices);
  }
  ngOnInit() {

  }

  Recuperar(usuario) {
    this.nombre =
      {
        'nombre': usuario
      };

    this.Comunidad();
    //buscando reclamos
    console.log("nombre:", this.nombre);
    this._reclamoService.VerReclamosAdmin(this.nombre).subscribe(
      response => {
        console.log("reclamo son:", response);
        this.reclamos = response;
        this.fechaDate=new Array(this.reclamos.length);
        this.transcurrido=new Array(this.reclamos.length);
        for(var reclamo of this.reclamos )
        {
          reclamo.fecha=new Date(reclamo.fecha);
          this.Convertfecha(reclamo.fecha);

        }
        console.log("los reclamo son:", this.reclamos);
      },
      error => {
        console.log(<any>error);
      }
    )

  }


  Comunidad() {


    this._comunidadService.VerComunidades(this.nombre).subscribe(
      response => {
        console.log("las comunidades son:", response);
        this.comunidades = response;
        console.log("los comunidades son:", this.comunidades);
      },
      error => {
        console.log(<any>error);
      }
    )


  }

  Actualizar(item: any) {
    //this.nuevoReclamo = new Reclamos(item._id,item.fecha,item.nombre,item.telefono,item.email,this.nuevoAdmin,item.direccion,item.problema,item.estado,item.solucion);
    //console.log("el rut es",this.rut);
    //item.comunidad=this.nombreComunidad;
    item.fecha=new Date(item.fecha);




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
    
    var horas=item.fecha.getHours();
    
    item.fecha= mes+'/'+dia+'/'+año+' '+horas+':'+minutos+':'+segundos;
        this.correo(item);
        alert("El reclamo ha sido actualizado y se ha notificado al residente");
      },
      error => {
        console.log(<any>error);
        this.actualizar = false;


      }

    )
  }

  correo(item) {
    this._correoService.correoupdate(item).subscribe(
      response => {
        console.log(response);
        if (item.estado == "Externo") {
          this.mailGerente();
        }
      },
      error => {
        console.log(<any>error);

      }

    )
  }

  mailGerente() {
    this._usuarioService.VerAdmin().subscribe(
      response => {
        console.log(response);
        this.correosGerenteSecreataria = response;
        console.log("correos secretarias y gerentes:", this.correosGerenteSecreataria);
        for (var item of this.correosGerenteSecreataria) {
          if (item.usuario == "gerente")
            this.correoGerente(item);
        }
      },
      error => {
        console.log(<any>error);
      }
    )
  }

  correoGerente(item) {
    this.datosGerente =
      {
        'nombre': item.nombre,
        '_id': this.idReclamo,
        'email': item.mail
      };
    this._correoService.reclamogerente(this.datosGerente).subscribe(
      response => {
        console.log(response);
      },
      error => {
        console.log(<any>error);

      }

    )
  }

  Convertfecha(reclamosAdmin)
  {
   
    var msecPerMinute = 1000 * 60;
    var msecPerHour = msecPerMinute * 60;
    var msecPerDay = msecPerHour * 24;

    var horaActual=new Date();

    // Get the difference in milliseconds.
    var diferencia=horaActual.getTime()-reclamosAdmin.getTime();

    // Calculate how many days the interval contains. Subtract that
// many days from the interval to determine the remainder.
    var days = Math.floor(diferencia / msecPerDay );
    diferencia = diferencia - (days * msecPerDay );

    // Calculate the hours, minutes, and seconds.
var hours = Math.floor(diferencia / msecPerHour );
diferencia = diferencia - (hours * msecPerHour );

var minutes = Math.floor(diferencia / msecPerMinute );
diferencia = diferencia - (minutes * msecPerMinute );

var seconds = Math.floor(diferencia/ 1000 );

this.transcurrido[this.contador]= days + " días, " + hours + " horas, " + minutes + " minutos, " + seconds + " segundos."


    var año = reclamosAdmin.getFullYear();
    console.log("",año);
    var mes = reclamosAdmin.getMonth() + 1;
    console.log("",mes);
    var dia = reclamosAdmin.getDate();
    console.log("",dia);
    var minutos = reclamosAdmin.getMinutes();
    console.log("",minutos);
    var segundos = reclamosAdmin.getSeconds();
    console.log("",segundos);
    var horas=reclamosAdmin.getHours();
    console.log("",horas);
   
    
   this.fechaDate[this.contador]=mes+'/'+dia+'/'+año+' '+horas+':'+minutos+':'+segundos;
this.contador=this.contador+1;
    

  }


}
