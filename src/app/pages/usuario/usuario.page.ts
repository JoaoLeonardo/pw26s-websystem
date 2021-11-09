import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

// material
import { MatSnackBar } from '@angular/material/snack-bar';

// shared
import { AdvancedCrudComponent } from 'src/app/shared/components/crud/advanced-crud-component';

// aplicação
import { Usuario } from './models/usuario';
import { UsuarioService } from './usuario.service';

@Component({
    selector: 'app-usuario',
    templateUrl: 'usuario.page.html',
    providers: [ UsuarioService ]
})
export class UsuarioComponent extends AdvancedCrudComponent<Usuario> implements OnInit {

    constructor(
        public service: UsuarioService,
        public snackBar: MatSnackBar, 
        public route: ActivatedRoute,
    ) { 
        super(service, snackBar, route);
    }
    
    ngOnInit() { }

}