export class Reclamos{
    constructor(
        public _id:string,
        public fecha: Date,
        public nombre:string, //nombre residente
        public telefono:string,
        public email:string, 
        public administrador:string,
        public direccion:string,
        public problema:string,
        public estado:string,
        public solucion:string
    )
    {}
}