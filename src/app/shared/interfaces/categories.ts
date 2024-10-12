import { Product } from "./product";

export interface Categories {
    id?:string,
    name:string,
    description?:string,
    position?:number,
    urlImage?:string,
    filePath?:string,
    useIcons?:boolean,
    idIcons?:string,
    products?: Product[];
}
