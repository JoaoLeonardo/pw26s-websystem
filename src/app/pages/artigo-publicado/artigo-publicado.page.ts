import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

// aplicação
import { ArtigoService } from '../artigo/artigo.service';
import { Artigo } from '../artigo/models/artigo';

@Component({
    selector: 'app-artigo-publicado',
    templateUrl: 'artigo-publicado.page.html',
    styleUrls: ['artigo-publicado.page.scss'],
    providers: [ ArtigoService ]
})
export class ArtigoPublicadoComponent implements OnInit {

    /**
     * @description Armazena o artigo buscado
     */
    public artigo?: Artigo;

    /**
     * @description Flag que identifica o estado de "carregamento"
     */
    public loading: boolean;

    constructor(
        private artigoService: ArtigoService,
        private snackBar: MatSnackBar,
        private router: Router,
        private route: ActivatedRoute,
    ) {
        // inicia as variáveis do template
        this.loading = false;
    }

    ngOnInit() {
        this.verificarRouteParams();
    }

    /**
     * @description Cria o form do CRUD
     */
    private verificarRouteParams() {
        const artigoId = this.route.snapshot.paramMap.get('id');

        if (artigoId) {
            // carrega o registro
            this.carregarArtigo(+artigoId);
        } else {
            // alerta erro e navega para a homepage
            this.snackBar.open('Não foi possível encontrar esse artigo!', 'Ok');
            this.router.navigateByUrl('home');
        }
    }

    /**
     * @description Busca o artigo no servidor
     * @param artigoId Identificador do artigo
     * // TODO: Ler por chave ao invés de id
     */
    private carregarArtigo(artigoId: number) {
        this.loading = true;
        this.artigoService.carregar(artigoId).subscribe(res => {
            this.loading = false;
            this.artigo = res;
        }, error => {
            this.snackBar.open((error['error']?.message || error.message) + '', 'Ok');
            this.router.navigateByUrl('home');
        });
    }

}