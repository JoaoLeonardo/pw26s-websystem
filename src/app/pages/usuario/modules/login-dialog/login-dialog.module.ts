import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// material
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

// aplicação
import { LoginDialogComponent } from './login-dialog.component';

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
        MatButtonModule,
        MatDialogModule,
        MatInputModule,
    ],
    exports: [LoginDialogComponent],
    declarations: [LoginDialogComponent],
    providers: [],
})
export class LoginDialogModule { }
