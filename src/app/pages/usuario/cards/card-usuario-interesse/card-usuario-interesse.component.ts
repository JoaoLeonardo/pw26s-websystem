
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { of } from 'rxjs';

// material
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

// shared
import { AdvancedCrudCard } from 'src/app/shared/components/crud/advanced-crud-card';
import { AdvancedCrudController } from 'src/app/shared/components/crud/advanced-crud.controller';
import { SysAutocompleteControl } from 'src/app/shared/components/autocomplete/sys-autocomplete';

// aplicação
import { Usuario } from '../../models/usuario';
import { Categoria } from 'src/app/pages/categoria/models/categoria';
import { CategoriaService } from 'src/app/pages/categoria/categoria.service';

@Component({
    selector: 'app-card-usuario-interesse',
    templateUrl: 'card-usuario-interesse.component.html',
    providers: [CategoriaService]
})
export class CardUsuarioIntesseComponent extends AdvancedCrudCard<Usuario> implements OnInit {

    @ViewChild('interessesInput') interessesInput!: ElementRef<HTMLInputElement>;

    /**
     * @description Classe de controle do auto-complete de interesses
     */
    public interesseAutocomplete!: SysAutocompleteControl;

    constructor(
        private categoriaService: CategoriaService,
        private snackBar: MatSnackBar,
        public crudController: AdvancedCrudController<Usuario>,
        public formBuilder: FormBuilder,
    ) {
        super(crudController, formBuilder);
    }

    ngOnInit(): void {
        this.registerControls();
    }

    private registerControls() {
        this.interesseAutocomplete = new SysAutocompleteControl(this.categoriaService.pesquisarTodos.bind(this.categoriaService), this.snackBar);
    }

    public get listaInteresses(): Categoria[] {
        return this.form.get('interesses')!.value;
    }

    criarForm(): FormGroup {
        return this.formBuilder.group({
            interesses: [],
        })
    }

    /**
     * @description Adiciona um novo interesse no FormControl
     */
    public adicionarInteresse(event: MatAutocompleteSelectedEvent) {
        const novoInteresse: Categoria = event.option.value;
        const listaInteresses = this.listaInteresses || [];

        if (novoInteresse) {
            listaInteresses.push(novoInteresse);
            // adiciona o novo interesse na lista e atualiza o FormControl
            this.form.get('interesses')!.setValue(listaInteresses);
        }

        // limpa o input
        this.interessesInput.nativeElement.value = '';
    }

    /**
     * @description Remove o interesse do FormControl
     */
    public removerInteresse(interesse: Categoria) {
        const index = this.listaInteresses.indexOf(interesse);
        const listaInteresses = this.listaInteresses || [];

        if (index >= 0) {
            // remove o interesse da lista e atualiza o FormControl
            listaInteresses.splice(index, 1);
            this.form.get('interesses')!.setValue(listaInteresses);
        }
    }

    /**
     * @description Filtra o auto-complete de interesse
     */
    public filtrarInteresse() {
        this.interesseAutocomplete.filtrar(this.interessesInput.nativeElement.value);
    }

}