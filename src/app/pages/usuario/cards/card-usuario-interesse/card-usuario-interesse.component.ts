
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

// material
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

// shared
import { AdvancedCrudCard } from 'src/app/shared/components/crud/advanced-crud-card';

// aplicação
import { Usuario } from '../../models/usuario';
import { Categoria } from 'src/app/pages/categoria/models/categoria';
import { CategoriaService } from 'src/app/pages/categoria/categoria.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-card-usuario-interesse',
    templateUrl: 'card-usuario-interesse.component.html',
    providers: [CategoriaService]
})
export class CardUsuarioIntesseComponent extends AdvancedCrudCard<Usuario> {

    @ViewChild('interessesInput') interessesInput!: ElementRef<HTMLInputElement>;

    /**
     * @description Armazena todos os interesses buscados
     */
    public listaTodosInteresses: Categoria[];

    /**
     * @description Armazena os interesses filtrados
     */
    public listaInteressesFiltrados: Categoria[];

    /**
     * @description Flag que identifica o estado de "carregamento"
     */
    public loading: boolean;

    constructor(
        private categoriaService: CategoriaService,
        private snackBar: MatSnackBar,
        public formBuilder: FormBuilder,
    ) {
        super(formBuilder);

        // inicia as variáveis usadas no template
        this.listaTodosInteresses = [];
        this.listaInteressesFiltrados = [];
        this.loading = false;

        // busca as categorias
        this.buscarCategorias();
    }

    public get listaInteresses(): Categoria[] {
        return this.form.get('interesses')?.value || [];
    }

    /**
     * @description Retorna um novo form
     */
    criarForm(): FormGroup {
        return this.formBuilder.group({
            interesses: [],
        })
    }

    /**
     * @description Busca as categorias cadastradas
     */
    private buscarCategorias() {
        this.loading = true;
        this.categoriaService.pesquisarTodos().subscribe(res => {
            this.loading = false;
            this.listaTodosInteresses = res;
            this.listaInteressesFiltrados = this.listaTodosInteresses;
        }, error => {
            this.loading = false;
            this.snackBar.open(error)
        });
    }

    /**
     * @description Adiciona um novo interesse no FormControl
     */
    public adicionarInteresse(event: MatAutocompleteSelectedEvent) {
        const novoInteresse: Categoria = event.option.value;

        if (novoInteresse) {
            // adiciona o novo interesse na lista e atualiza o FormControl
            this.listaInteresses.push(novoInteresse);
            this.form.get('interesses')!.setValue(this.listaInteresses);
        }

        // limpa o input
        this.interessesInput.nativeElement.value = '';
    }

    /**
     * @description Remove o interesse do FormControl
     */
    public removerInteresse(interesse: Categoria) {
        const index = this.listaInteresses.indexOf(interesse);

        if (index >= 0) {
            // remove o interesse da lista e atualiza o FormControl
            this.listaInteresses.splice(index, 1);
            this.form.get('interesses')!.setValue(this.listaInteresses);
        }

    }
}