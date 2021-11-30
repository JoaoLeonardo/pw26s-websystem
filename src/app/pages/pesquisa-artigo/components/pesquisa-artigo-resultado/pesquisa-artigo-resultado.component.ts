import { Component, Input, OnInit } from '@angular/core';

// aplicação
import { ArtigoDTO } from 'src/app/pages/homepage/models/artigo-dto';

@Component({
    selector: 'app-pesquisa-artigo-resultado',
    templateUrl: 'pesquisa-artigo-resultado.component.html'
})

export class PesquisaArtigoResultadoComponent implements OnInit {

    @Input() public artigoDto!: ArtigoDTO;

    constructor() { }

    ngOnInit() { }

}