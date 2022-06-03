import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MelodyDTO } from './models/melody-dto';

@Component({
    selector: 'app-player',
    templateUrl: 'player.component.html',
    styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit, OnChanges {

    @Input() melody?: MelodyDTO;

    public noteSequence?: any;

    constructor() { }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['melody']) {
            this.noteSequence = this.melody ? this.melody.input_sequence[0] : null;
        }
    }

    ngOnInit() { }

    public play() { }

    public rate() { }

}

