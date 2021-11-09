import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

// shared
import { CrudService } from 'src/app/shared/components/crud/crud.service';

// aplicação
import { Categoria } from './models/categoria';

@Injectable()
export class CategoriaService extends CrudService<Categoria> {

    constructor(public http: HttpClient) {
        super('categoria', http);
    }
    
    public get novoRegistro(): Observable<Categoria> {
        return of({ descricao: '' });
    }

    /**
     * @description MOCK FAVOR REMOVER
     */
    public incluir(novo: Categoria): Observable<void> {
        return new Observable(observer => {
            setTimeout(() => {
                // observer.next();
                observer.error("Oops! Não foi possível salvar o registro... :(");
                observer.complete();
            }, 600);
        })
    }

    /**
     * @description MOCK FAVOR REMOVER
     */
    public pesquisarTodos(): Observable<Categoria[]> {
        return of([
            { id: 1, descricao: 'MOCK' },
            { id: 2, descricao: 'NÃO É MOCK >:(' },
            { id: 3, descricao: 'É MOCK SIM :p' },
        ])
    }

}