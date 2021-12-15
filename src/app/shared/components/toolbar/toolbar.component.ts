import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

// material
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

// pages
import { UsuarioDialogComponent } from 'src/app/pages/usuario/modules/usuario-dialog/usuario-dialog.component';

// aplicação
import {
    ToolbarButtonActionType,
    getToolbarButtonActionLogadoOptions,
    getToolbarButtonActionAdminOptions,
    getToolbarButtonActionAnonOptions
} from './models/enums/toolbar-button-action';
import { UsuarioService } from 'src/app/pages/usuario/usuario.service';
import { errorTransform } from '../../pipes/error-transform';
import { LoginService } from '../../services/login.service';
import { LabelValue } from '../../models/label-value';

@Component({
    selector: 'app-toolbar',
    templateUrl: 'toolbar.component.html',
    styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit, OnDestroy {

    /**
     * @description Flag que identifica usuário logado
     */
    public isAuthenticated: boolean;

    // enum options
    public buttonOptions: LabelValue[];
    public logoutOpt: ToolbarButtonActionType;

    /**
     * @description Armazena as incrições de eventos do componente
     */
    private subscription: Subscription;

    constructor(
        private usuarioService: UsuarioService,
        private loginService: LoginService,
        private snackBar: MatSnackBar,
        private router: Router,
        public dialog: MatDialog,
    ) {
        // inicializa os enums
        this.buttonOptions = getToolbarButtonActionAnonOptions();
        this.logoutOpt = 'LOGOUT';
        // inicializa as variáves do template
        this.isAuthenticated = false;
        // inicializa o subscription
        this.subscription = new Subscription();
    }

    ngOnInit() {
        this.implementEvents();

        if (this.loginService.isAuthenticated) {
            // executa pois o usuário já está autenticado
            this.onLoginEvent();
        }
    }

    private implementEvents() {
        const loginSub = this.loginService.onLoginEvent.subscribe(() => this.onLoginEvent());
        this.subscription.add(loginSub);
    }

    /**
     * @description Executado no evento de login (bem sucedido)
     */
    private onLoginEvent() {
        this.isAuthenticated = this.loginService.isAuthenticated;

        if (this.loginService.isAuthenticated) {
            // ações autenticado
            this.buttonOptions = getToolbarButtonActionLogadoOptions();
            // valida as permissões do autenticado (pode mudar as ações)
            this.validatePermission();
        } else {
            // ações sem autenticação
            this.buttonOptions = getToolbarButtonActionAnonOptions();
        }
    }

    /**
     * @description Busca e valida a permissão do usuário autenticado
     */
    private validatePermission() {
        this.usuarioService.logado().subscribe(res => {
            const hasPermission = res.permissoes?.find(permissao => permissao.nome === 'ROLE_ADMIN') != null;

            if (hasPermission) {
                // ações autenticado como admin
                this.buttonOptions = getToolbarButtonActionAdminOptions();
            }
        }, error => {
            this.snackBar.open(errorTransform(error), 'Ok');
        });
    }

    /**
     * @description Chamado pelos botões da toolbar
     * @param action Ação do botão
     */
    public executeAction(action: ToolbarButtonActionType) {
        switch (action) {
            case 'LOGIN':
                this.dialog.open(UsuarioDialogComponent);
                break;
            case 'LOGOUT':
                this.loginService.logout();
                break;
            case 'ARTIGO':
                this.router.navigateByUrl('artigo');
                break;
            case 'CATEGORIA':
                this.router.navigateByUrl('categoria');
                break;
            case 'INFO':
                window.open('https://github.com/JoaoLeonardo/pw26s-websystem');
                break;
        }
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

}