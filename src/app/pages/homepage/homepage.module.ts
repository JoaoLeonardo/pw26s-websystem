import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

// material
import { MatIconModule } from '@angular/material/icon';

// shared
import { TokenInterceptor } from 'src/app/shared/interceptors/token-interceptor.interceptor';

// aplicação
import { HomepageComponent } from './homepage.page';
import { ArtigosRowComponent } from './components/artigos-row/artigos-row.component';

const routes: Routes = [
    { path: '', component: HomepageComponent }
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),

        // material
        MatIconModule,
    ],
    declarations: [
        HomepageComponent,
        ArtigosRowComponent,
    ],
    providers: [
        TokenInterceptor,

        // interceptors
        { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true, },
    ],
})
export class HomepageModule { }
