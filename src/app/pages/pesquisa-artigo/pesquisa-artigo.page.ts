import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { Subscription } from 'rxjs';

// material
import { MatSnackBar } from '@angular/material/snack-bar';

// aplicação
import { ArtigoService } from '../artigo/artigo.service';
import { ArtigoDTO } from '../homepage/models/artigo-dto';

@Component({
    selector: 'app-pesquisa-artigo',
    templateUrl: 'pesquisa-artigo.page.html',
    providers: [
        ArtigoService,
        FormBuilder,
    ]
})
export class PesquisaArtigoComponent implements OnInit, OnDestroy {

    /**
     * @description FormGroup do filtro de busca
     */
    public form: FormGroup;

    /**
     * @description Armazena os resultados da busca pelos artigos
     */
    public listaResultado: ArtigoDTO[];

    /**
     * @description Flag que controla a configuração de "busca automática"
     */
    public autoBusca?: boolean;

    /**
     * @description Flag que controla o estado "em carregamento" do componente
     */
    public loading: boolean;

    /**
     * @description Armazena as incrições de eventos do componente
     */
    private subscription?: Subscription;

    constructor(
        private artigoService: ArtigoService,
        private formBuilder: FormBuilder,
        private snackBar: MatSnackBar,
    ) {
        this.form = this.criarForm();
        this.listaResultado = [];
        this.loading = false;
    }

    ngOnInit() {
        this.autoBusca = localStorage.getItem('autoBusca') ? localStorage.getItem('autoBusca') !== 'false' : false;

        if (this.autoBusca) {
            this.implementChanges();
        }
    }

    private criarForm(): FormGroup {
        return this.formBuilder.group({ filtro: [null, Validators.required] })
    }

    private implementChanges() {
        this.subscription = new Subscription();
        this.subscription.add(this.form.get('filtro')!.valueChanges.pipe(debounceTime(300)).subscribe(() => this.filtrarArtigos()));
    }

    private removeChanges() {
        if (this.subscription && !this.subscription.closed) {
            this.subscription.unsubscribe();
        }
    }

    /**
     * @description Busca os artigos de acordo com o filtro informado
     * @param filtro Filtro da pesquisa
     */
    public filtrarArtigos(filtro = this.form.get('filtro')!.value) {
        if (!filtro) {
            this.form.updateValueAndValidity();
            return;
        }

        this.loading = true;
        this.artigoService.pesquisarArtigos(filtro).subscribe(res => {
            this.loading = false;
            this.listaResultado = res;

            if (!res || res.length === 0) {
                this.snackBar.open('Não foi possível encontrar nenhum registro correspondente ao filtro informado!', 'Ok');
            }
        }, error => {
            this.loading = false;
            this.snackBar.open((error['error']?.message || error.message) + '', 'Ok');
        });
    }

    /**
     * @description Executa no toggleChange do do slide-toggle da busca automática
     */
    public onAutoBuscaChange() {
        this.autoBusca = !this.autoBusca;

        localStorage.setItem('autoBusca', this.autoBusca + '');

        if (this.autoBusca) {
            this.implementChanges();
        } else {
            this.removeChanges();
        }
    }

    ngOnDestroy(): void {
        this.removeChanges();
    }

}