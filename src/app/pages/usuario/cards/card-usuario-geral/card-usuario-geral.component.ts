
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// shared
import { AdvancedCrudCard } from 'src/app/shared/components/crud/advanced-crud-card';
import { AdvancedCrudController } from 'src/app/shared/components/crud/advanced-crud.controller';

// aplicação
import { Usuario } from '../../models/usuario';

@Component({
    selector: 'app-card-usuario-geral',
    templateUrl: 'card-usuario-geral.component.html'
})
export class CardUsuarioGeralComponent extends AdvancedCrudCard<Usuario> {

    constructor(
        public crudController: AdvancedCrudController<Usuario>,
        public formBuilder: FormBuilder,
    ) {
        super(crudController, formBuilder);
    }

    /**
     * @description Retorna um novo form
     */
    criarForm(): FormGroup {
        return this.formBuilder.group({
            nome: [null, Validators.required],
            sobrenome: [null, Validators.required],
            email: [null, Validators.required],
            username: [null, Validators.required],
        })
    }

    /**
     * @description Valora o form com o registro
     */
    setForm(registro: Usuario): void {
        this.form.reset(registro);
    }

    /**
     * @description Valora o registro com o form
     */
    setRegistro(registro: Usuario): void {
        Object.assign(registro, this.form.getRawValue());
    }

}