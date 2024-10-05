import { Categories } from "./categories"
import { Product } from "./product"

export interface BusinessInformation {

    id?:string,
    nameCompany?:string,
    nameUser?:string,
    emailCompany?:string,
    create?:Date,
    urlImgRestaurante?: string,
    filePath?:string,
    idUSer?:string,
    idMenu?:string,
    adress?:string,
    horario?:string,
    phone?:number,
    principalColor?:string,
    secondaryColor?:string,
    terciaryColor?:string,
    url?:string
    status?: 'active' | 'desactive'  | 'delete'
    products?: Product[],
    categories?:Categories[],
    likes?: number;
    nivel?: 'basic' | 'premium' | 'elite'
}
