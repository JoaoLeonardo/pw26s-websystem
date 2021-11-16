
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// shared
import { AdvancedCrudCard } from 'src/app/shared/components/crud/advanced-crud-card';
import { AdvancedCrudController } from 'src/app/shared/components/crud/advanced-crud.controller';

// aplicação
import { Artigo } from '../../models/artigo';

@Component({
    selector: 'app-card-artigo-texto',
    templateUrl: 'card-artigo-texto.component.html'
})
export class CardArtigoTextoComponent extends AdvancedCrudCard<Artigo> {

    /**
     * @description Flag que controla o estado 'checado' do slide-toggle
     */
    public slideChecked: boolean;

    // TODO: Criar componente próprio para escrever texto (se der tempo)
    constructor(
        public crudController: AdvancedCrudController<Artigo>,
        public formBuilder: FormBuilder,
    ) {
        super(crudController, formBuilder);
        this.slideChecked = false;
    }

    public get texto(): string {
        return this.form.get('texto')?.value;
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

}