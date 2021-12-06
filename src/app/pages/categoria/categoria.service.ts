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

}