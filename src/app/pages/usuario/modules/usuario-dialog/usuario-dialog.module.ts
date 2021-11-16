import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// material
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

// aplicação
import { UsuarioDialogComponent } from './usuario-dialog.component';
import { LoginDialogModule } from '../login-dialog/login-dialog.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        BrowserModule,
        HttpClientModule,
        ReactiveFormsModule,
        
        // material
        MatProgressSpinnerModule,
        MatSnackBarModule,
        MatStepperModule,
        MatButtonModule,
        MatDialogModule,
        MatInputModule,
        MatIconModule,

        // aplicação
        LoginDialogModule,
    ],
    exports: [UsuarioDialogComponent],
    declarations: [UsuarioDialogComponent],
    providers: [],
})
export class UsuarioDialogModule { }
