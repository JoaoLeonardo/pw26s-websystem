import { Component } from '@angular/core';

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
    public melody: any;

    constructor() { }

    public generate() {
        const randomIndex = Math.floor(Math.random() * 19);
        this.melody = dataSet[randomIndex];
        console.log(this.melody);
    }

}