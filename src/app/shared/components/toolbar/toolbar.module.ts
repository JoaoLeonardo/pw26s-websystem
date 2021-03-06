import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';

// material
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';

// pages
import { UsuarioDialogModule } from 'src/app/pages/usuario/modules/usuario-dialog/usuario-dialog.module';

// aplicação
import { ToolbarComponent } from './toolbar.component';

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        RouterModule,

        // material
        MatToolbarModule,
        MatDividerModule,
        MatButtonModule,
        MatMenuModule,
        MatIconModule,

        // pages
        UsuarioDialogModule,
    ],
    exports: [ToolbarComponent],
    declarations: [ToolbarComponent],
    providers: [],
})
export class ToolbarModule { }
