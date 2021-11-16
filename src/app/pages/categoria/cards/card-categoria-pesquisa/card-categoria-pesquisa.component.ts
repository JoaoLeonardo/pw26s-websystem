
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, Subject, Subscription } from 'rxjs';

// shared
import { CrudController } from 'src/app/shared/components/crud/crud.controller';

// aplicação
import { CategoriaService } from '../../categoria.service';
import { Categoria } from '../../models/categoria';

@Component({
    selector: 'app-card-categoria-pesquisa',
    templateUrl: 'card-categoria-pesquisa.component.html'
})
export class CardCategoriaPesquisaComponent implements OnInit, OnDestroy {

    /**
     * @description Armazena a lista de registros retornada pela api
     */
    public listaRegistros: Categoria[];

    /**
     * @description Flag que identifica o estado de "carregamento"
     */
    public loading: boolean;

    /**
     * @description Armazena as colunas da tabela
     */
    public columns: string[] = ['identificador', 'descricao', 'acoes'];

    /**
     * @description Evento de edição do registro
     */
    private _editarRegistroEvent: Subject<number> = new Subject();

    /**
     * @description Evento de remoção o registro
     */
    private _removerRegistroEvent: Subject<number> = new Subject();

    /**
     * @description Armazena as incrições de eventos do componente
     */
    private subscription: Subscription;

    constructor(
        private categoriaService: CategoriaService,
        private controller: CrudController,
        private snackBar: MatSnackBar,
    ) {
        this.subscription = new Subscription();
        this.listaRegistros = [];
        this.loading = false;
    }

    ngOnInit() {
        this.implementEvents();
        this.carregarRegistros();
    }

    private implementEvents() {
        // events do crud
        this.subscription.add(this.controller.onOperacaoConcluida.subscribe(() => this.carregarRegistros()));
    }

    /**
     * @description Busca os registros na api
     */
    public carregarRegistros() {
        this.loading = true;
        this.categoriaService.pesquisarTodos().subscribe(res => {
            this.loading = false;
            this.listaRegistros = res;
        }, error => {
            this.loading = false;
            this.snackBar.open(error.message, 'Ok');
        })
    }

    /**
     * @description Lança o evento de edição do registro
     * @param id Identificador do registro
     */
    public editarRegistro(id: number): void {
        this._editarRegistroEvent.next(id);
    }

    /**
     * @description Lança o evento de remoção do registro
     * @param id Identificador do registro
     */
    public removerRegistro(id: number): void {
        this._removerRegistroEvent.next(id);
    }

    public get editarRegistroEvent(): Observable<number> {
        return this._editarRegistroEvent.asObservable();
    }

    public get removerRegistroEvent(): Observable<number> {
        return this._removerRegistroEvent.asObservable();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}