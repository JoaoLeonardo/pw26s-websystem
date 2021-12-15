import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

// material
import { MatSnackBar } from '@angular/material/snack-bar';

// shared
import { AdvancedCrudComponent } from 'src/app/shared/components/crud/advanced-crud-component';
import { AdvancedCrudController } from 'src/app/shared/components/crud/advanced-crud.controller';
import { errorTransform } from 'src/app/shared/pipes/error-transform';

// aplicação
import { Usuario } from './models/usuario';
import { UsuarioService } from './usuario.service';

@Component({
    selector: 'app-usuario',
    templateUrl: 'usuario.page.html',
    providers: [
        AdvancedCrudController,
    ]
})
export class UsuarioComponent extends AdvancedCrudComponent<Usuario> implements OnInit {

    constructor( // TODO carregar pelo usuário logado
        public crudController: AdvancedCrudController<Usuario>,
        public service: UsuarioService,
        public snackBar: MatSnackBar,
        public route: ActivatedRoute,
    ) {
        super(crudController, service, snackBar, route);
    }

    ngOnInit() {
        super.ngOnInit();
    }
    
    /**
     * @description Sobreescreve o método do AdvancedCrudComponent para evitar requests indevidos
     */
    public verificarCrudRouteParams() {
        this.carregar();
    }

    /**
     * @description Sobreescreve o método do AdvancedCrudComponent para evitar requests indevidos
     */
    public carregar(): void {
        this.loading = true;
        this.service.logado().subscribe(res => {
            this.loading = false;
            this.registro = res;
            this.crudController.notificarCarga();
            this.atualizarCards();
        }, error => {
            this.loading = false;
            this.snackBar.open(errorTransform(error), 'Ok');
        });
    }

}