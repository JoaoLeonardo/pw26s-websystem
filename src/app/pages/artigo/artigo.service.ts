import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

// shared
import { CrudService } from 'src/app/shared/components/crud/crud.service';

// aplicação
import { Artigo } from './models/artigo';
import { ArtigoDTO } from '../homepage/models/artigo-dto';

@Injectable()
export class ArtigoService extends CrudService<Artigo> {

    constructor(public http: HttpClient) {
        super('artigo', http);
    }

    public get novoRegistro(): Observable<Artigo> {
        return of({
            titulo: '',
            descricao: '',
            palavrasChave: '',
            texto: '',
        });
    }

    /**
     * @description Busca os artigos do usuário logado
     * @returns Registros gravados pelo usuário logado
     */
    public carregarArtigosLogado(): Observable<ArtigoDTO[]> {
        return this.http.get<ArtigoDTO[]>(this.baseUrl + this.url + '/artigos-usuario');
    }

}