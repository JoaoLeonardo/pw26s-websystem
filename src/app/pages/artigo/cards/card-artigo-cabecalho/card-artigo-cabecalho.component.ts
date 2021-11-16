
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// material
import { MatChipInputEvent } from '@angular/material/chips';

// shared
import { AdvancedCrudCard } from 'src/app/shared/components/crud/advanced-crud-card';
import { AdvancedCrudController } from 'src/app/shared/components/crud/advanced-crud.controller';

// aplicação
import { Artigo } from '../../models/artigo';
import { ArtigoDescricaoValidator } from './validators/artigo-descricao-validator';

@Component({
    selector: 'app-card-artigo-cabecalho',
    templateUrl: 'card-artigo-cabecalho.component.html'
})
export class CardArtigoCabecalhoComponent extends AdvancedCrudCard<Artigo> {

    @ViewChild('chipInput') public palavrasChaveInput!: ElementRef<HTMLInputElement>;

    constructor(
        public crudController: AdvancedCrudController<Artigo>,
        public formBuilder: FormBuilder,
    ) {
        super(crudController, formBuilder);
    }

    public get palavrasChave(): string[] {
        return this.form.get('palavrasChave')!.value;
    }

    public get descricaoControl() {
        return this.form.get('descricao');
    }

    /**
     * @description Retorna um novo form
     */
    criarForm(): FormGroup {
        return this.formBuilder.group({
            titulo: [null, Validators.required],
            descricao: [null, [Validators.required, ArtigoDescricaoValidator]], // TODO: Validator (max: 140 caracteres)
            palavrasChave: [null, Validators.required],
            categoria: [null]
        })
    }

    /**
     * @description Adiciona uma palavra chave no formControl
     */
    public adicionarPalavraChave(event: MatChipInputEvent) {
        const palavrasChave = this.palavrasChave || [];

        if (event.value && event.value.length > 0) {
            palavrasChave.push(event.value);
            this.form.get('palavrasChave')!.setValue(palavrasChave || [event.value]);
            this.palavrasChaveInput.nativeElement.value = '';
        }
    }

    /**
     * @description Remove uma palavra chave do formControl
     */
    public removerPalavraChave(palavra: string) {
        const indexOfPalavra = this.palavrasChave.indexOf(palavra);
        const palavrasChave = this.palavrasChave || [];

        if (indexOfPalavra >= 0) {
            palavrasChave.splice(indexOfPalavra, 1);
            this.form.get('palavrasChave')!.setValue(palavrasChave);
        }
    }

}