import { Component } from '@angular/core';

// shared
import { MelodyDTO } from 'src/app/shared/components/player/models/melody-dto';

// aplicação
import * as dataSet from '../../data/dataset.json';

@Component({
    selector: 'app-homepage',
    templateUrl: './homepage.page.html',
    styleUrls: ['./homepage.page.scss'],
})
export class HomepageComponent {

    /**
     * @description Melodia (MIDI) repassada ao player
     */
    public melody?: MelodyDTO;

    constructor() { }

    /**
     * @description Busca um índice aleatório no JSON de dados
     */
    public generate() {
        const randomIndex = Math.floor(Math.random() * 0);
        const dto: MelodyDTO = dataSet[randomIndex];
        this.melody = dto;
    }

    /**
     * @description Executa no click do logo
     * * Leva o scroll até o footer
     */
    public onClickLogo() {
        const footer = document.getElementsByTagName('footer');
        footer[0].scrollIntoView({ behavior: 'smooth' });
    }

}