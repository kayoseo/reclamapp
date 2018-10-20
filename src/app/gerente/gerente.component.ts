import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gerente',
  templateUrl: './gerente.component.html',
  styleUrls: ['./gerente.component.css']
})
export class GerenteComponent implements OnInit {
public opcion:string;
public accion:string;
  constructor() { 
    this.opcion='nada';
    this.accion='nada';
  }

  ngOnInit() {
  }

  cambiarOp(option:string)
  {
    this.opcion=option;
    console.log("la opcion marcada es",this.opcion);
  }
  cambiarAc(action:string)
  {
    this.accion=action;
    console.log("la accion marcada es",this.accion);
  }

}
