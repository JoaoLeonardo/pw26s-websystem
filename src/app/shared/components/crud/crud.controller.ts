import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";

@Injectable()
export class CrudController {

    public operacaoConcluidaEvent: Subject<void> = new Subject();

    public notificarOperacaoConcluida() {
        this.operacaoConcluidaEvent.next();
    }

    public get onOperacaoConcluida(): Observable<void> {
        return this.operacaoConcluidaEvent.asObservable();
    }

}