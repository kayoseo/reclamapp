import { Component, OnInit } from '@angular/core';
import { Reclamos } from '../Plantilla/reclamosformulario';
import { Numero } from '../Plantilla/buscar';
import { ReclamoService } from '../services/reclamo.service';
import { AdministradorService } from '../services/administrador.service';

@Component({
  selector: 'app-reclamo',
  templateUrl: './reclamo.component.html',
  styleUrls: ['./reclamo.component.css'],
  providers: [ReclamoService, AdministradorService]
})
export class ReclamoComponent implements OnInit {
  public reclamoForm: Reclamos;
  public buscador: Numero;
  public fecha: Date;
  public numero: string;
  public buscar: number;
  public mostrarForm: boolean;

  public user: any;

  public admin:object;

  public numeroReclamo:any;
  public resultado:any;


  constructor(private _reclamoService: ReclamoService, private _administradorService: AdministradorService) {
   var i=0;
    this._administradorService.VerAdmin().subscribe(
      request => {
        this.resultado=request;
        console.log(request);
        for(let i;i<this.resultado.length;i++)
        {
          console.log(i);
          this.admin[i].push(this.resultado);
         
      }
        console.log(this.admin);
      },
      error => {
        console.log(<any>error);


      }
    )

    //
    
    //
    this.mostrarForm = true;
    this.fecha = new Date();//creando el numero de reclamo
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


    //this.reclamoForm = new Reclamos(this.numero, this.fecha, '', '', '', '', '', '', 'kl', 'kl');
    this.reclamoForm = new Reclamos(this.fecha, '', '', '', '', '', '', '', '');
    this.buscador = new Numero('');


  }

  ngOnInit() {

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
        this.reclamoForm = new Reclamos(this.fecha, '', '', '', '', '', '', '', '');
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
}
