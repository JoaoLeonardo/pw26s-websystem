import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

// material
import { MatSnackBar } from '@angular/material/snack-bar';

// shared
import { AdvancedCrudComponent } from 'src/app/shared/components/crud/advanced-crud-component';
import { AdvancedCrudController } from 'src/app/shared/components/crud/advanced-crud.controller';

// aplicação
import { Artigo } from './models/artigo';
import { ArtigoService } from './artigo.service';

@Component({
    selector: 'app-artigo',
    templateUrl: 'artigo.page.html',
    providers: [
        AdvancedCrudController,
        ArtigoService,
    ]
})
export class ArtigoComponent extends AdvancedCrudComponent<Artigo> implements OnInit {

    constructor(
        public crudController: AdvancedCrudController<Artigo>,
        public service: ArtigoService,
        public snackBar: MatSnackBar,
        public route: ActivatedRoute,
    ) {
        super(crudController, service, snackBar, route);
        // TODO: Na api, validar se o usuário editando o artigo é o autor
    }

    ngOnInit() {
        super.ngOnInit();
    }

}