import Domicilio from "./Domicilio";

export default class Sucursal {
    id: number = 0;
    nombre: string = "";
    horarioApertura: string = "";
    horarioCierre: string = "";
    casaMatriz: boolean = false;
    domicilio: Domicilio = new Domicilio()
}