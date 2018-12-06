export class Reclamos{
    constructor(
        //public numero:string,
        public fecha: Date,
        public nombre:string, //nombre residente
        public fechaTermino: Date,
        public telefono:string,
        public email:string, 
        public administrador:string,
        public comunidad:string,
        public torreDpto:string,
        public direccion:string,
        public problema:string,
        public estado:string,
        public solucion:string,
        public encuesta:string
    )
    {}
}