import { Component, OnInit } from '@angular/core';
import { Reclamos } from '../Plantilla/reclamosformulario';
import { Numero } from '../Plantilla/buscar';
import { ReclamoService } from '../services/reclamo.service';
import { UsuarioService } from '../services/usuario.service';
import { CorreoService } from '../services/correo.service';

@Component({
  selector: 'app-reclamo',
  templateUrl: './reclamo.component.html',
  styleUrls: ['./reclamo.component.css'],
  providers: [ReclamoService, UsuarioService, CorreoService]
})
export class ReclamoComponent implements OnInit {
  public reclamoForm: Reclamos;
  public buscador: Numero;
  public fecha: Date;
  public numero: string;
  public buscar: number;
  public mostrarForm: boolean;

  public user: any;

  public admin:any;

  public numeroReclamo:any;
  public resultado:any;
  public i:any;

  public datosCorreo:any;
  public mailSecretaria:any;


  constructor(private _reclamoService: ReclamoService, private _usuarioService: UsuarioService, private _correoService: CorreoService) {
   this.i=1;
    this._usuarioService.VerAdmin().subscribe(
      request => {
        this.resultado=request;
        console.log(request);
        for(var admin of this.resultado)
        {
          console.log(admin);
          this.admin=this.resultado;
        
      }
        console.log("administradores",this.admin);
      },
      error => {
        console.log(<any>error);


      }
    )

    //
    
    //
    this.mostrarForm = true;
    this.fecha = new Date();
    
    var año = this.fecha.getFullYear();
    console.log("",año);
    var mes = this.fecha.getMonth() + 1;
    console.log("",mes);
    var dia = this.fecha.getDate();
    console.log("",dia);
    var minutos = this.fecha.getMinutes();
    console.log("",minutos);
    var segundos = this.fecha.getSeconds();
    console.log("",segundos);
    var horas=this.fecha.getHours();
    console.log("",horas);
    // The parameters are year, month, day, hours, minutes, seconds.
    this.fecha= new Date(mes+'/'+dia+'/'+año+' '+horas+':'+minutos+':'+segundos);
    console.log(this.fecha);
    //this.numero = mes + "" + año + "" + "" + dia + "" + minutos + "" + mili + "" + segundos;
  


    //this.reclamoForm = new Reclamos(this.numero, this.fecha, '', '', '', '', '', '', 'kl', 'kl');
    this.reclamoForm = new Reclamos(this.fecha,'','', '','', '', '', '', '', '', '','');
    this.buscador = new Numero('');


  }

  ngOnInit() {

  }

 home()
 {
  this.mostrarForm = true;
  this.fecha = new Date();
  this.reclamoForm = new Reclamos(this.fecha,'','', '','', '', '', '', '', '', '','');
    this.buscador = new Numero('');

 }

  onSubmit(form) {
    console.log("submit lanzado", this.reclamoForm);
    this._reclamoService.AddReclamo(this.reclamoForm).subscribe(
      response => {
        console.log(response);
        this.numeroReclamo=response._id;
        console.log("el numero de reclamo es ", this.numeroReclamo);
        this.mostrarForm = false;
        this.fecha = new Date();
        //creando el numero de reclamo
        /*
        var año = this.fecha.getFullYear();
        var mes = this.fecha.getMonth() + 1;
        var dia = this.fecha.getDate();
        var minutos = this.fecha.getMinutes();
        var segundos = this.fecha.getSeconds();
        var mili = this.fecha.getMilliseconds();
        this.numero = mes + "" + año + "" + "" + dia + "" + minutos + "" + mili + "" + segundos;
        */
        //hasta aquí

        //this.reclamoForm = new Reclamos(this.numero, this.fecha, '', '', '', '', '', '', '', '');
        this.correo();
        this.reclamoForm = new Reclamos(this.fecha,'','','', '', '', '', '', '', '', '','');
        form.reset();
        
      },
      error => {
        console.log(<any>error);


      }
    )
    
  }
  onBuscar() {
    console.log("numero", this.buscar)
  }


correo()
{
  this.datosCorreo=
      {
        '_id': this.numeroReclamo,
        'email':this.reclamoForm.email,
        'nombre':this.reclamoForm.nombre
      };
  this._correoService.reclamoresidente(this.datosCorreo).subscribe(
    response => {
      console.log(response);
      console.log("Correo enviado a: ", this.reclamoForm.email);
    },
    error => {
      console.log(<any>error);
    }
  )
if(this.reclamoForm.administrador=="Desconocido")
{
  this._usuarioService.VerSecretaria().subscribe(
    response => {
      console.log(response);
      this.mailSecretaria=response;
     console.log("correos secretarias:",this.mailSecretaria);
     for(var item of this.mailSecretaria)
     {
       this.correoSecretaria(item);
}
    },
    error => {
      console.log(<any>error);
    }
  )


}
else
{
  for(var item of this.admin)
  {
    if(item.nombre==this.reclamoForm.administrador)
    {
      this.datosCorreo=
      {
        '_id': this.numeroReclamo,
        'email':item.mail
      };
      this.correoAdministrador(this.datosCorreo);
    }
  }
}

}

correoSecretaria(item)
{
  this._correoService.reclamosecretaria(item).subscribe(
    response => {
      console.log(response);
      console.log("Correo enviado a: ", item);
    },
    error => {
      console.log(<any>error);
    }
  )
}

correoAdministrador(item)
{
  this._correoService.reclamoadministrador(item).subscribe(
    response => {
      console.log(response);
      console.log("Correo enviado a: ", item);
    },
    error => {
      console.log(<any>error);
    }
  ) 
}
}