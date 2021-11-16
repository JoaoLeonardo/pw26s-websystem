import { Categoria } from "../../categoria/models/categoria";
import { Usuario } from "../../usuario/models/usuario";

export interface Artigo {
    id?: number;
    titulo: string;
    descricao: string;
    palavrasChave: string;
    texto: string;
    categoria?: Categoria;
    autor?: Usuario;
}
