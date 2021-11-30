import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// material
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

// aplicação
import { PesquisaArtigoComponent } from './pesquisa-artigo.page';
import { PesquisaArtigoResultadoComponent } from './components/pesquisa-artigo-resultado/pesquisa-artigo-resultado.component';

const routes: Routes = [
    { path: '', component: PesquisaArtigoComponent }
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule,
        ReactiveFormsModule,

        // material
        MatProgressSpinnerModule,
        MatSnackBarModule,
        MatButtonModule,
        MatInputModule,
        MatCardModule,
        MatIconModule,
    ],
    declarations: [
        PesquisaArtigoComponent,

        // componentes
        PesquisaArtigoResultadoComponent,
    ],
    providers: [],
})
export class PesquisaArtigoModule { }
