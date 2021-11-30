
import { Component, NgZone, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';

// shared
import { AdvancedCrudCard } from 'src/app/shared/components/crud/advanced-crud-card';
import { AdvancedCrudController } from 'src/app/shared/components/crud/advanced-crud.controller';

// aplicação
import { Artigo } from '../../models/artigo';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-card-artigo-texto',
    templateUrl: 'card-artigo-texto.component.html'
})
export class CardArtigoTextoComponent extends AdvancedCrudCard<Artigo> implements OnInit, OnDestroy {

    @ViewChild('textoAutosize') public autosize!: CdkTextareaAutosize;

    /**
     * @description Flag que controla o estado 'checado' do slide-toggle
     */
    public slideChecked: boolean;

    /**
     * @description Armazena as inscrições de eventos
     */
    private _subscription: Subscription;

    // TODO: Criar componente próprio para escrever texto (se der tempo)
    constructor(
        private _ngZone: NgZone,
        public crudController: AdvancedCrudController<Artigo>,
        public formBuilder: FormBuilder,
    ) {
        super(crudController, formBuilder);
        this.slideChecked = false;
        this._subscription = new Subscription();
    }

    ngOnInit(): void {
        this.implementEvents();
    }

    public get texto(): string {
        return this.form.get('texto')?.value;
    }

    private implementEvents() {
        this._subscription.add(this._ngZone.onStable.subscribe(() => this.autosize.resizeToFitContent(true)));
    }

    criarForm(): FormGroup {
        return this.formBuilder.group({
            texto: [null, Validators.required],
        })
    }

    /**
     * @description Executa no toggleChange do do slide-toggle
     */
    public onSlideChange() {
        this.slideChecked = !this.slideChecked;
    }

    ngOnDestroy() {
        this._subscription.unsubscribe();
    }

}