import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

// material
import { MatButtonModule } from '@angular/material/button';

// aplicação
import { PlayerComponent } from './player.component';

@NgModule({
    imports: [
        CommonModule,

        // material
        MatButtonModule,
    ],
    declarations: [
        PlayerComponent,
    ],
    exports: [
        PlayerComponent
    ],
    providers: [],
})
export class PlayerModule { }
