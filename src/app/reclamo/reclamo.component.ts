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
  public numero:number;
  public buscar:number;

  constructor() { 
    this.numero;
    this.fecha=new Date();
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
