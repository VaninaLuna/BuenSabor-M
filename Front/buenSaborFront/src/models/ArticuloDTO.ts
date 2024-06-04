import Imagen from "./Imagen";

export default class ArticuloDTO {
    denominacion: string = "";
    precioVenta: number = 0;
    imagenes: Imagen[] = [];
}