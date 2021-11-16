import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

// material
import { MatSnackBar } from '@angular/material/snack-bar';

// shared
import { LoginService } from 'src/app/shared/services/login.service';

@Component({
    selector: 'app-login-dialog',
    templateUrl: 'login-dialog.component.html'
})
export class LoginDialogComponent {

    /**
     * @description FormGroup da modal 
     */
    public form: FormGroup;

    /**
     * @description Flag que identifica o componente em estado de "carregamento"
     */
    public loading: boolean;

    constructor(
        private loginService: LoginService,
        private formBuilder: FormBuilder,
        private snackBar: MatSnackBar,
        private dialog: MatDialog,
    ) {
        this.form = this.criarForm();
        this.loading = false;
    }

    public criarForm(): FormGroup {
        return this.formBuilder.group({
            username: [null, Validators.required],
            password: [null, Validators.required]
        })
    }

    /**
     * @description Executa no click do botão "Cadastrar" do stepper
     * * Valida o form e cadastra o usuário
     */
    public onClickBtnCadastrar() {
        this.form.updateValueAndValidity();

        if (this.form.valid) {
            this.form.disable();
            this.loading = true;
            this.loginService.login(this.form.getRawValue()).subscribe(() => {
                this.loading = false;
                this.dialog.closeAll();
            }, error => {
                this.form.enable();
                this.loading = false;
                this.snackBar.open(error.message, 'Ok');
            });
        }
    }

}
