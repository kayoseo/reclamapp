export class Comunidad{
    constructor(
        public nombre:string,
        public direccion: string,
        public administrador: string,
        public torreDpto:any[],  //es un array con el nombre 
                                //de las torres que tiene
    )
    {}
}