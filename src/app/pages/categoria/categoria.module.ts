import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// material
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table'; 
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

// shared
import { TokenInterceptor } from 'src/app/shared/interceptors/token-interceptor.interceptor';

// aplicação
import { CategoriaComponent } from './categoria.page';
import { CardCategoriaEdicaoComponent } from './cards/card-categoria-edicao/card-categoria-edicao.component';
import { CardCategoriaPesquisaComponent } from './cards/card-categoria-pesquisa/card-categoria-pesquisa.component';

const routes: Routes = [
    { path: '', component: CategoriaComponent }
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
        MatSnackBarModule,
        MatButtonModule,
        MatInputModule,
        MatTableModule,
        MatIconModule,
        MatCardModule,
    ],
    declarations: [ 
        CategoriaComponent,
        
        // cards
        CardCategoriaEdicaoComponent,
        CardCategoriaPesquisaComponent,
     ],
     providers: [
        TokenInterceptor,

        // interceptors
        { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true, },
    ],
})
export class CategoriaModule { }
