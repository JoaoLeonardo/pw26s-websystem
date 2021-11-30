import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

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
export class PesquisaArtigoComponent implements OnInit {

    /**
     * @description FormGroup do filtro de busca
     */
    public form: FormGroup;

    /**
     * @description Armazena os resultados da busca pelos artigos
     */
    public listaResultado: ArtigoDTO[];

    /**
     * @description Flag que controla o estado "em carregamento" do componente
     */
    public loading: boolean;

    /**
     * @description Armazena as incrições de eventos do componente
     */
    private subscription: Subscription;

    constructor(
        private artigoService: ArtigoService,
        private formBuilder: FormBuilder,
        private snackBar: MatSnackBar,
    ) {
        this.form = this.criarForm();
        this.subscription = new Subscription();
        this.listaResultado = [];
        this.loading = false;
    }

    ngOnInit() {
        this.implementChanges();
    }
    
    private criarForm(): FormGroup {
        return this.formBuilder.group({ filtro: [null, Validators.required] })
    }

    private implementChanges() {
        this.subscription.add(this.form.get('filtro')!.valueChanges.pipe(debounceTime(300)).subscribe(() => this.filtrarArtigos()));
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
            this.listaResultado = [{ id: 1, titulo: 'Artigo 1', autor: 'Teste testado' }, { id: 2, titulo: 'Artigo 2', autor: 'Teste testado' }];
            this.loading = false;
            this.snackBar.open(error.message, 'Ok');
        });
    }

}