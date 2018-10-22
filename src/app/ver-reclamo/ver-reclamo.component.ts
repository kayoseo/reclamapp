import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'app-ver-reclamo',
  templateUrl: './ver-reclamo.component.html',
  styleUrls: ['./ver-reclamo.component.css']
})
export class VerReclamoComponent implements OnInit {

  public id_reclamo:string;
  constructor(private _route: ActivatedRoute, 
    private _router: Router
  ) {


  }

  ngOnInit() {
    this._route.params.subscribe((params: Params) =>{
      this.id_reclamo=params.nombre;
      console.log(this.id_reclamo);
    });
  }

}
