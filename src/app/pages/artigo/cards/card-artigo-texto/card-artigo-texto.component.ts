
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

    constructor(
        public crudController: AdvancedCrudController<Artigo>,
        public formBuilder: FormBuilder,
    ) {
        super(crudController, formBuilder);
    }

    /**
     * @description Retorna um novo form
     */
    criarForm(): FormGroup {
        return this.formBuilder.group({
            texto: [null, Validators.required],
        })
    }

}