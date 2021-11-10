import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

// material
import { MatSnackBar } from '@angular/material/snack-bar';

// shared
import { AdvancedCrudComponent } from 'src/app/shared/components/crud/advanced-crud-component';
import { AdvancedCrudController } from 'src/app/shared/components/crud/advanced-crud.controller';

// aplicação
import { Usuario } from './models/usuario';
import { UsuarioService } from './usuario.service';

@Component({
    selector: 'app-usuario',
    templateUrl: 'usuario.page.html',
    providers: [
        AdvancedCrudController,
        UsuarioService,
    ]
})
export class UsuarioComponent extends AdvancedCrudComponent<Usuario> implements OnInit {

    constructor(
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

}