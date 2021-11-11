import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// material
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

// aplicação
import { ArtigoComponent } from './artigo.page';
import { CardArtigoTextoComponent } from './cards/card-artigo-texto/card-artigo-texto.component';
import { CardArtigoCabecalhoComponent } from './cards/card-artigo-cabecalho/card-artigo-cabecalho.component';

const routes: Routes = [
    { path: '', component: ArtigoComponent }
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule,
        HttpClientModule,
        ReactiveFormsModule,

        // material
        MatProgressSpinnerModule,
        MatAutocompleteModule,
        MatSnackBarModule,
        MatButtonModule,
        MatInputModule,
        MatChipsModule,
        MatIconModule,
        MatCardModule,
    ],
    exports: [],
    declarations: [
        ArtigoComponent,

        // cards
        CardArtigoCabecalhoComponent,
        CardArtigoTextoComponent,
    ],
    providers: [],
})
export class ArtigoModule { }
