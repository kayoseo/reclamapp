import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-secretaria',
  templateUrl: './secretaria.component.html',
  styleUrls: ['./secretaria.component.css']
})
export class SecretariaComponent implements OnInit {
  public rut:string;
  constructor(private _route: ActivatedRoute, 
    private _router: Router) { }

  ngOnInit() {
    this._route.params.subscribe((params: Params) =>{
      this.rut=params.rut;
      console.log(this.rut);
    });

   
  }

}
