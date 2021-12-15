import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoginService } from 'src/app/shared/services/login.service';
import { ArtigoService } from '../artigo/artigo.service';

// aplicação
import { ArtigosRowComponent } from './components/artigos-row/artigos-row.component';

@Component({
    selector: 'app-homepage',
    templateUrl: './homepage.page.html',
    styleUrls: ['./homepage.page.scss'],
})
export class HomepageComponent implements OnInit, AfterViewInit, OnDestroy {

    @ViewChild('recomendacoesRow')
    private recomendacoesRow!: ArtigosRowComponent;

    @ViewChild('destaquesRow')
    private destaquesRow!: ArtigosRowComponent;

    /**
     * @description Flag que identifica usuário logado
     */
    public isAuthenticated: boolean;

    /**
     * @description Armazena as incrições de eventos do componente
     */
    private subscription: Subscription;

    constructor(
        private artigoService: ArtigoService,
        private loginService: LoginService,
    ) {
        // inicializa as variáves do template
        this.isAuthenticated = false;
        // inicializa o subscription
        this.subscription = new Subscription();
    }

    ngOnInit() {
        this.isAuthenticated = this.loginService.isAuthenticated;
        this.implementEvents();
    }

    ngAfterViewInit(): void {
        this.buscarRecomendacoes();
        this.buscarDestaques();
    }
    
    private implementEvents() {
        const loginSub = this.loginService.onLoginEvent.subscribe(res => {
            this.isAuthenticated = res;
            this.buscarRecomendacoes();
        });
        this.subscription.add(loginSub);
    }

    /**
     * @description Busca as recomendações do usuário e seta o resultado na row de destaque
     */
    private buscarRecomendacoes(): void {
        if (this.recomendacoesRow && this.loginService.isAuthenticated) {
            this.artigoService.artigosRecomendacao().subscribe(res => this.recomendacoesRow.montarRow(res));
        }
    }

    /**
     * @description Busca os destaques gerais do sistema e seta o resultado na row de destaque
     */
    private buscarDestaques(): void {
        this.artigoService.artigosPorDestaque().subscribe(res => this.destaquesRow.montarRow(res));
    }

    /**
     * @description Executa no click do logo
     * * Leva o scroll até a última row de artigos
     */
    public onClickLogo() {
        const listaRows = document.getElementsByTagName('app-artigos-row');

        if (listaRows) {
            listaRows[listaRows.length - 1].scrollIntoView({ behavior: 'smooth' });
        }
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

}