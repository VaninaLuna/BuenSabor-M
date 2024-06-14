export default class Categoria{
    id:number = 0;
    codigo:string = "";
    denominacion:string = "";
    categoriaPadre?:Categoria | null;
    subCategorias:Categoria[] = [];
}
