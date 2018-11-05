import { Component, OnInit } from '@angular/core';
import {Reclamos} from '../Plantilla/reclamosformulario';
import {Numero} from '../Plantilla/buscar';

@Component({
  selector: 'app-reclamo',
  templateUrl: './reclamo.component.html',
  styleUrls: ['./reclamo.component.css']
})
export class ReclamoComponent implements OnInit {
  public reclamoForm: Reclamos;
  public buscador: Numero;
  public fecha:Date;
  public numero:string;
  public buscar:number;


  constructor() { 
    
    this.fecha=new Date();//creando el numero de reclamo
    var año=this.fecha.getFullYear();
    var mes=this.fecha.getMonth()+1;
    var dia=this.fecha.getDate();
    var minutos=this.fecha.getMinutes();
    var segundos=this.fecha.getSeconds();
    var mili=this.fecha.getMilliseconds();
    this.numero=mes+""+año+""+""+dia+""+minutos+""+mili+""+segundos;
    //hasta aquí
    
    this.reclamoForm=new Reclamos(this.numero,this.fecha,'','','','','','','','');
  this.buscador=new Numero('');
  }

  ngOnInit() {
  }

  onSubmit()
  {
    console.log("submit lanzado", this.reclamoForm);
  }
  onBuscar()
  {
    console.log("numero", this.buscar)
  }
}
