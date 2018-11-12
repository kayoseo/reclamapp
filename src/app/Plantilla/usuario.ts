export class Usuario{
    constructor(
        public nombre:string,
        public mail:string,
        public clave:string,
        public usuario:string //secretaria, administrador o gerente
    )
    {}
}