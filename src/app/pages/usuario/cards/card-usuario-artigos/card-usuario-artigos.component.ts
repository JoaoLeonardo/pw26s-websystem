
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

// shared
import { AdvancedCrudController } from 'src/app/shared/components/crud/advanced-crud.controller';

// aplicação
import { ArtigoDTO } from 'src/app/pages/homepage/models/artigo-dto';
import { ArtigoService } from 'src/app/pages/artigo/artigo.service';
import { Usuario } from '../../models/usuario';

@Component({
    selector: 'app-card-usuario-artigos',
    templateUrl: 'card-usuario-artigos.component.html',
    providers: [ArtigoService]
})
export class CardUsuarioArtigosComponent implements OnInit {

    /**
     * @description Armazena os artigos publicados pelo usuário
     */
    public listaArtigos: ArtigoDTO[];

    /**
     * @description Armazena as colunas da tabela
     */
    public columns: string[] = ['titulo', 'acoes'];

    /**
     * @description Flag que identifica o estado de "carregamento"
     */
    public loading: boolean;

    constructor(
        private artigoService: ArtigoService,
        private snackBar: MatSnackBar,
        public crudController: AdvancedCrudController<Usuario>,
    ) {
        this.listaArtigos = [];
        this.loading = false;
    }

    ngOnInit(): void {
        this.crudController.onCarregarRegistro.subscribe(() => this.buscarArtigos());
    }

    /**
     * @description Busca os artigos publicados pelo usuário logado
    */
    private buscarArtigos(): void {
        this.loading = true;
        this.artigoService.carregarArtigosLogado().subscribe(res => {
            this.loading = false;
            this.listaArtigos = res;
        }, error => {
            this.loading = false;
            this.snackBar.open(error.message, 'Ok');
        })
    }

}
