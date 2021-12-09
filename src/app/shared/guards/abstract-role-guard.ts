import { Inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

// shared
import { LoginService } from 'src/app/shared/services/login.service';

// aplicação
import { UsuarioService } from '../../pages/usuario/usuario.service';

@Injectable()
export abstract class AbsctractRoleGuard implements CanActivate {

    constructor(
        public usuarioService: UsuarioService,
        public loginService: LoginService,
        public snackBar: MatSnackBar,
        public router: Router,
        @Inject('role') public roles: string[],
    ) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> {
        return new Observable<boolean>(observer => {
            if (this.loginService.isAuthenticated) {
                this.usuarioService.logado().subscribe(res => {
                    const hasPermission = res.permissoes?.find(permissao => this.roles.find(role => role === permissao.nome)) != null;
                    
                    observer.next(hasPermission);
                    observer.complete();

                    if (!hasPermission) {
                        this.alertNoPermission();
                    }
                }, error => {
                    observer.next(error);
                    observer.complete();
                    this.router.navigateByUrl('');
                    this.snackBar.open(error.message, 'Ok');
                });
            } else {
                observer.next(false);
                observer.complete();
                this.alertNoPermission();
            }
        });
    }

    private alertNoPermission(): void {
        this.snackBar.open('Você não tem permissão para acessar esse recurso!', 'Ok');
        this.router.navigateByUrl('');
    }

}
