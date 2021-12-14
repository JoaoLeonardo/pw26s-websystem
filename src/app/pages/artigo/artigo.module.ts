import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// material
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

// editor
import { AngularEditorModule } from '@kolkov/angular-editor';

// shared
import { TokenInterceptor } from 'src/app/shared/interceptors/token-interceptor.interceptor';
import { SysPipesModule } from 'src/app/shared/pipes/sys-pipes.module';

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
        MatSlideToggleModule,
        MatSnackBarModule,
        MatButtonModule,
        MatInputModule,
        MatChipsModule,
        MatIconModule,
        MatCardModule,

        // Editor
        AngularEditorModule,

        // shared
        SysPipesModule,
    ],
    exports: [],
    declarations: [
        ArtigoComponent,

        // cards
        CardArtigoCabecalhoComponent,
        CardArtigoTextoComponent,
    ],
    providers: [
        TokenInterceptor,

        // interceptors
        { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true, },
    ],
})
export class ArtigoModule { }
