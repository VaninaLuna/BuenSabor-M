import Rol from "./Rol";

export default class Usuario {
    id?:number;
    nombreUsuario: string = "";
    password: string = "";
    rol: Rol = new Rol();
}

export class UsuarioLogin{
    nombreUsuario: string = "";
    password: string = "";
}