import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {ReclamoService} from '../services/reclamo.service';


@Component({
  selector: 'app-ver-reclamo',
  templateUrl: './ver-reclamo.component.html',
  styleUrls: ['./ver-reclamo.component.css'],
  providers:[ReclamoService]
})
export class VerReclamoComponent implements OnInit {

  public id_reclamo:string;
  public reclamo:any;
  constructor(private _route: ActivatedRoute, 
    private _router: Router,private _reclamoService:ReclamoService
  ) {
   

  }

  ngOnInit() {
    this._route.params.subscribe((params: Params) =>{
      this.id_reclamo=params.numero;
      console.log(this.id_reclamo);
    });
    this._reclamoService.VerReclamo(this.id_reclamo).subscribe(
      result => {
        this.reclamo=result;
        console.log(this.reclamo);
      },
      error=>{
        console.log(<any>error);
      }
    )
  }

}
