import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

// material
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

// aplicação
import { VisualizerModule } from '../visualizer/visualizer.module';
import { PlayerBtnPipe } from './pipes/player-btn.pipe';
import { PlayerComponent } from './player.component';

@NgModule({
    imports: [
        CommonModule,

        // material
        MatButtonModule,
        MatIconModule,

        // aplicação
        VisualizerModule,
    ],
    declarations: [
        PlayerComponent,

        // pipes
        PlayerBtnPipe,
    ],
    exports: [
        PlayerComponent
    ],
    providers: [],
})
export class PlayerModule { }
