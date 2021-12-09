import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// material
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

// shared
import { TokenInterceptor } from 'src/app/shared/interceptors/token-interceptor.interceptor';

// aplicação
import { ArtigoPublicadoComponent } from './artigo-publicado.page';

const routes: Routes = [
    { path: '', component: ArtigoPublicadoComponent }
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        HttpClientModule,

        // material
        MatProgressSpinnerModule,
        MatSnackBarModule,
        MatIconModule,
        MatCardModule,
    ],
    declarations: [
        ArtigoPublicadoComponent,
    ],
    providers: [
        TokenInterceptor,

        // interceptors
        { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true, },
    ],
})
export class ArtigoPublicadoModule { }
