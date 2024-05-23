import Localidad from "./Localidad";

export default class Domicilio {
    id: number = 0;
    nombre: string = "";
    localidad: Localidad = new Localidad();
}
