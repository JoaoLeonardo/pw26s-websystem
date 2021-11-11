
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// material
import { MatChipInputEvent } from '@angular/material/chips';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SysAutocompleteControl } from 'src/app/shared/components/autocomplete/sys-autocomplete';

// shared
import { AdvancedCrudCard } from 'src/app/shared/components/crud/advanced-crud-card';
import { AdvancedCrudController } from 'src/app/shared/components/crud/advanced-crud.controller';

// aplicação
import { Artigo } from '../../models/artigo';
import { Categoria } from 'src/app/pages/categoria/models/categoria';
import { CategoriaService } from 'src/app/pages/categoria/categoria.service';
import { ArtigoDescricaoValidator } from './validators/artigo-descricao-validator';

@Component({
    selector: 'app-card-artigo-cabecalho',
    templateUrl: 'card-artigo-cabecalho.component.html',
    providers: [CategoriaService],
})
export class CardArtigoCabecalhoComponent extends AdvancedCrudCard<Artigo> implements OnInit {

    @ViewChild('chipInput') public palavrasChaveInput!: ElementRef<HTMLInputElement>;
    @ViewChild('categoriaInput') public categoriaInput!: ElementRef<HTMLInputElement>;

    /**
     * @description Classe de controle do auto-complete de categoria
     */
    public categoriaAutocomplete!: SysAutocompleteControl;

    constructor(
        public crudController: AdvancedCrudController<Artigo>,
        public categoriaService: CategoriaService,
        public formBuilder: FormBuilder,
        public snackBar: MatSnackBar,
    ) {
        super(crudController, formBuilder);
    }
    
    public get palavrasChave(): string[] {
        return this.form.get('palavrasChave')!.value;
    }

    public get descricaoControl() {
        return this.form.get('descricao');
    }

    ngOnInit(): void {
        this.registerControls();
        this.implementChanges();
    }

    private registerControls() {
        this.categoriaAutocomplete = new SysAutocompleteControl(this.categoriaService.pesquisarTodos.bind(this.categoriaService), this.snackBar);
    }

    private implementChanges() {
        this.form.get('categoria')?.valueChanges.subscribe(this.onChangeCategoria.bind(this));
    }

    criarForm(): FormGroup {
        return this.formBuilder.group({
            titulo: [null, Validators.required],
            descricao: [null, [Validators.required, ArtigoDescricaoValidator]], // TODO: Validator (max: 140 caracteres)
            palavrasChave: [null, Validators.required],
            categoria: [null]
        })
    }

    /**
     * @description Executa no change do FormControl de categoria
     */
    public onChangeCategoria(val: Categoria) {
        this.categoriaInput.nativeElement.value = val ? val.descricao : ''; 
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

    /**
     * @description Filtra o auto-complete de categoria
     */
    public filtrarCategoria() {
        this.categoriaAutocomplete.filtrar(this.categoriaInput.nativeElement.value);
    }

}