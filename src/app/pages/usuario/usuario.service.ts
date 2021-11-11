import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

// shared
import { CrudService } from 'src/app/shared/components/crud/crud.service';

// aplicação
import { Usuario } from './models/usuario';

@Injectable()
export class UsuarioService extends CrudService<Usuario> {

    // TODO: Validar na carga se o usuário sendo carregado é o mesmo que está logado!!!!
    constructor(public http: HttpClient) {
        super('usuario', http);
    }

    public get novoRegistro(): Observable<Usuario> {
        return of({
            nome: '',
            sobrenome: '',
            email: '',
            username: '',
            password: '',
        });
    }

}