import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

// shared
import { errorTransform } from 'src/app/shared/pipes/error-transform';

// aplicação
import { UsuarioService } from '../../usuario/usuario.service';
import { ArtigoService } from '../artigo.service';


@Injectable()
export class ArtigoAutorGuard implements CanActivate {

    constructor(
        public artigoService: ArtigoService,
        public usuarioService: UsuarioService,
        public snackBar: MatSnackBar,
        public router: Router,
    ) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> {
        return new Observable<boolean>(observer => {
            const artigoId = route.paramMap.get('id') || 0;

            if (!artigoId) {
                observer.next(true);
                observer.complete();
            }

            // verifica se o usuário logado é o autor do artigo em edição
            this.usuarioService.logado().subscribe(logado => {
                this.artigoService.carregar(+artigoId).subscribe(artigo => {
                    if (artigo.autor?.id !== logado.id) {
                        // impede abertura pois não é o autor
                        observer.next(false);
                        observer.complete();
                        this.alertNoPermission();
                    } else {
                        // permite abertura pois é o autor
                        observer.next(true);
                        observer.complete();
                    }
                }, error => {
                    observer.next(error);
                    observer.complete();
                    this.router.navigateByUrl('');
                    this.snackBar.open(errorTransform(error), 'Ok');
                });
            }, error => {
                observer.next(error);
                observer.complete();
                this.router.navigateByUrl('');
                this.snackBar.open(errorTransform(error), 'Ok');
            });
        });
    }

    private alertNoPermission(): void {
        this.snackBar.open('Você não tem permissão para acessar esse artigo!', 'Ok');
        this.router.navigateByUrl('');
    }

}
