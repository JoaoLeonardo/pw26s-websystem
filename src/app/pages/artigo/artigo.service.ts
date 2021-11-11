import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

// shared
import { CrudService } from 'src/app/shared/components/crud/crud.service';

// aplicação
import { Artigo } from './models/artigo';

@Injectable()
export class ArtigoService extends CrudService<Artigo> {

    constructor(public http: HttpClient) {
        super('usuario', http);
    }

    public get novoRegistro(): Observable<Artigo> {
        return of({
            titulo: '',
            descricao: '',
            palavrasChave: [],
            texto: '',
        });
    }

}