import { Inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

// shared
import { LoginService } from 'src/app/shared/services/login.service';

// aplicação
import { UsuarioService } from '../../pages/usuario/usuario.service';
import { AbsctractRoleGuard } from './abstract-role-guard';

@Injectable()
export class UserRoleGuard extends AbsctractRoleGuard {

    constructor(
        public usuarioService: UsuarioService,
        public loginService: LoginService,
        public snackBar: MatSnackBar,
        public router: Router,
    ) {
        super(usuarioService, loginService, snackBar, router, ['ROLE_USER', 'ROLE_ADMIN']);
    }

}
