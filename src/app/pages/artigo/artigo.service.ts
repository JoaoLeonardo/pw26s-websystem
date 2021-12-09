import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

// shared
import { CrudService } from 'src/app/shared/components/crud/crud.service';

// aplicação
import { ArtigoDTO } from '../homepage/models/artigo-dto';
import { Artigo } from './models/artigo';

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

    /**
     * @description Filtra os artigos por título e palavras-chave
     */
    public pesquisarArtigos(filtro: string): Observable<ArtigoDTO[]> {
        const params: HttpParams = new HttpParams().append('filtro', filtro);
        return this.http.post<ArtigoDTO[]>(this.baseUrl + this.url + '/filtro/titulo-chave', { params: params });
    }

    /**
     * @description Busca os detaques gerais do sistema
     */
    public artigosPorDestaque(): Observable<ArtigoDTO[]> {
        return this.http.get<ArtigoDTO[]>(this.baseUrl + this.url + '/destaque').pipe(
            // TODO: Remover quando finalizado DTO na api
            map(destaques => destaques.map((destaque: any) => {
                destaque.autor = destaque.autor ? `${destaque.autor['nome']} - ${destaque.autor['sobrenome']}` : 'sem dados';
                return destaque;
            }))
        );
    }

    /**
     * @description Busca as recomendações do usuário logado
     */
    public artigosRecomendacao(): Observable<ArtigoDTO[]> {
        return this.http.get<ArtigoDTO[]>(this.baseUrl + this.url + '/recomendacao').pipe(
            // TODO: Remover quando finalizado DTO na api
            map(destaques => destaques.map((destaque: any) => {
                destaque.autor = destaque.autor ? `${destaque.autor['nome']} - ${destaque.autor['sobrenome']}` : 'sem dados';
                return destaque;
            }))
        );
    }

}