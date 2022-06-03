import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

// material
import { MatIconModule } from '@angular/material/icon';

// shared
import { PlayerModule } from 'src/app/shared/components/player/player.module';

// aplicação
import { HomepageComponent } from './homepage.page';
import { MatButtonModule } from '@angular/material/button';

const routes: Routes = [
    { path: '', component: HomepageComponent }
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),

        // material
        MatIconModule,
        MatButtonModule,

        // shared
        PlayerModule,
    ],
    declarations: [
        HomepageComponent,
    ],
})
export class HomepageModule { }
