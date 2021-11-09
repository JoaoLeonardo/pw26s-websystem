import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

// material
import { MatSnackBar } from '@angular/material/snack-bar';

// shared
import { BasicCrudComponent } from 'src/app/shared/components/crud/basic-crud-component';

// aplicação
import { Categoria } from './models/categoria';
import { CategoriaService } from './categoria.service';
import { CardCategoriaEdicaoComponent } from './cards/card-categoria-edicao/card-categoria-edicao.component';
import { CardCategoriaPesquisaComponent } from './cards/card-categoria-pesquisa/card-categoria-pesquisa.component';

@Component({
    selector: 'app-categoria',
    templateUrl: 'categoria.page.html',
    providers: [
        CategoriaService,
    ]
})
export class CategoriaComponent extends BasicCrudComponent<Categoria> implements AfterViewInit {

    @ViewChild(CardCategoriaEdicaoComponent)
    private cardEdicao!: CardCategoriaEdicaoComponent;

    @ViewChild(CardCategoriaPesquisaComponent)
    private cardPesquisa!: CardCategoriaPesquisaComponent;

    /**
     * @description Armazena as incrições de eventos do componente
     */
    private subscription: Subscription;

    constructor(
        public service: CategoriaService,
        public formBuilder: FormBuilder,
        public snackBar: MatSnackBar, 
        public route: ActivatedRoute,
    ) { 
        super(formBuilder, service, snackBar, route);
        this.subscription = new Subscription();
    }

    ngAfterViewInit(): void {
        super.ngOnInit();
        this.implementEvents();
    }

    private implementEvents() {
        // events do card de edição
        this.subscription.add(this.cardEdicao.persistirEdicaoEvent.subscribe(() => super.persistirAlteracoes(this.form.get('id')?.value != null)));
        this.subscription.add(this.cardEdicao.removerRegistroEvent.subscribe(this.removerRegistro.bind(this)));
        // events do card de pesquisa
        this.subscription.add(this.cardPesquisa.editarRegistroEvent.subscribe(super.carregar.bind(this)));
        this.subscription.add(this.cardPesquisa.editarRegistroEvent.subscribe(this.removerRegistro.bind(this)));
    }

    public criarForm(): FormGroup {
        return this.formBuilder.group({
            id: [null],
            descricao: [null, Validators.required]
        })
    }

    /**
     * @description Remove o registro e configura o card de edição (se necessário)
     * @param id Id do registro
     */
    private removerRegistro(id: number) {
        super.remover(id);

        if (this.form.get('id')?.value === id) {
            this.form.reset();
        }
    }

}