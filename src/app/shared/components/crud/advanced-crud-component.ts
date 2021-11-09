import { Injectable, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

// material
import { MatSnackBar } from "@angular/material/snack-bar";

// aplicação
import { CrudService } from "./crud.service";
import { CrudComponent } from "./crud-component";
import { AdvancedCrudController } from "./advanced-crud.controller";

@Injectable()
export abstract class AdvancedCrudComponent<T> implements CrudComponent<T>, OnInit {

    /**
     * @description Registro do formulário
     */
    public registro!: T;

    /**
     * @description Flag que identifica o estado de "carregamento"
     */
    public loading: boolean;

    constructor(
        public crudController: AdvancedCrudController<T>,
        public service: CrudService<T>,
        public snackBar: MatSnackBar,
        public route: ActivatedRoute,
    ) {
        this.loading = false;
    }

    ngOnInit(): void {
        this.verificarCrudRouteParams();
    }

    /**
     * @description Cria o form do CRUD
     */
    public verificarCrudRouteParams() {
        this.route.params.subscribe(params => {
            if (params['id']) {
                // carrega o registro
                this.carregar(params['id']);
            } else {
                // prepara o registro para uma nova inclusão
                this.loading = true;
                this.service.novoRegistro.subscribe(res => {
                    this.loading = false;
                    this.registro = res;
                }, error => {
                    this.loading = false;
                    this.snackBar.open(error.message, 'Ok');
                });
            }
        });
    }

    /**
     * @description Persiste as alteração da inclusão/edição
     * @param isEdicao Flag que indica Update ao invés de Create
     */
    public persistirAlteracoes(isEdicao: boolean): void {
        if (!this.registro) {
            return;
        }

        if (isEdicao) {
            this.atualizar(this.registro);
        } else {
            this.salvar(this.registro);
        }
    }

    /**
     * @description Executa a validação do form e persiste o registro no banco
     * @param registro Registro que será persistido
     */
    public salvar(registro: T): void {
        if (this.validarForm()) {
            this.loading = true;
            this.service.incluir(registro).subscribe(() => {
                this.loading = false;
                this.snackBar.open('O registro foi incluído com sucesso!', 'Ok');
            }, error => {
                this.loading = false;
                this.snackBar.open(error.message, 'Ok');
            });
        }
    }

    /**
     * @description Executa a validação do form e atualiza o registro do banco
     * @param registro Registro que será atualizado
     */
    public atualizar(registro: T): void {
        if (this.validarForm()) {
            this.loading = true;
            this.service.atualizar(registro).subscribe(() => {
                this.loading = false;
                this.snackBar.open('As alterações foram salvas com sucesso!', 'Ok');
            }, error => {
                this.loading = false;
                this.snackBar.open(error.message, 'Ok');
            });
        }
    }

    /**
     * @description Carrega o registro do banco
     * @param registroId Id do registro a ser carregado
     */
    public carregar(registroId: number): void {
        this.loading = true;
        this.service.carregar(registroId).subscribe(res => {
            this.loading = false;
            this.registro = res;
        }, error => {
            this.loading = false;
            this.snackBar.open(error.message, 'Ok');
        });
    }

    /**
     * @description Remove o registro do banco
     * @param registroId Id do registro a ser removido
     */
    public remover(registroId: number): void {
        this.loading = true;
        this.service.remover(registroId).subscribe(() => {
            this.loading = false;
            this.snackBar.open('O registro foi excluído com sucesso!', 'Ok');
        }, error => {
            this.loading = false;
            this.snackBar.open(error.message, 'Ok');
        });
    }

    /**
     * @description Atualiza os cards com o novo registro buscado
     */
    public atualizarCards() {
        if (this.crudController.cardList) {
            this.crudController.cardList.forEach(card => card.setForm(this.registro));
        }
    }

    /**
     * @description Atualiza o registro com os valores dos cards
     */
    public atualizarRegistro() {
        if (this.crudController.cardList) {
            this.crudController.cardList.forEach(card => card.setRegistro(this.registro));
        }
    }

    /**
     * @description Valida o preenchimento dos forms de cada card
     * @returns True se todos os forms forem válidos
     */
    public validarForm(): boolean {
        for (let card of this.crudController.cardList) {
            if (!card.validarForm()) {
                return false;
            }
        }

        return true;
    }

}