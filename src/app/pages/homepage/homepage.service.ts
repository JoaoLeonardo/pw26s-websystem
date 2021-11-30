import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

// aplicação
import { ArtigoDTO } from './models/artigo-dto';

@Injectable()
export class HomepageService {
    
    constructor() { }

    /**
     * @returns Destaques gerais do sistema
     */
    public getDestaques(): Observable<ArtigoDTO[]> {
        return new Observable(observer => {
            observer.next([
            ]);
            observer.complete();
        })
    }
    
    /**
     * @returns Recomendações personalizadas por usuário
     * @param usuarioId Id do usuário
     */
     public getRecomendacoes(usuarioId: number): Observable<ArtigoDTO[]> {
        return new Observable(observer => {
            observer.next([
            ]);
            observer.complete();
        })
    }
    
}