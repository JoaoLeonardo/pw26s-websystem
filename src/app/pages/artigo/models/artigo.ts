import { Categoria } from "../../categoria/models/categoria";

export interface Artigo {
    id?: number;
    titulo: string;
    descricao: string;
    palavrasChave: string[];
    texto: string;
    categoria?: Categoria;
}
