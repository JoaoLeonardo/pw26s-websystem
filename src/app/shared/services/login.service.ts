import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http"
import { Observable, Subject } from "rxjs";

// environment
import { environment } from "src/environments/environment";

// aplicação
import { LoginRequest } from "../models/login-request";
import { LoginInfo } from "../models/login-info";

@Injectable({ providedIn: 'root' })
export abstract class LoginService {

    /**
     * @description Armazena a url base do sistema
     */
    private _url = environment.api + 'login';

    /**
     * @description Armazena as informações do usuário logado
     */
    private _loginInfo?: LoginInfo;

    /**
     * @description Evento de login
     */
    private _loginEvent: Subject<LoginInfo>;

    constructor(private http: HttpClient) {
        this._loginEvent = new Subject();
    }

    /**
     * @description Retorna as informações do usuário logado
     */
    public get loginInfo(): LoginInfo | undefined {
        return this._loginInfo;
    }

    /**
     * @description Observable do evento de login
     */
    public get onLoginEvent(): Observable<LoginInfo> {
        return this._loginEvent.asObservable();
    }

    /**
     * @description Loga no sistema
     * @returns Id do usuário
     * @param request Request de login com email/username e senha
     */
    public login(request: LoginRequest): Observable<number> {
        return new Observable(observer => {
            this.http.post<LoginInfo>(this._url + '/logar', request).subscribe(res => {
                observer.next(res.userId);
                observer.complete();
                this._loginEvent.next(res);
            }, error => {
                observer.error(error);
                observer.complete();
            })
        });
    }

    /**
     * @description Desloga do sistema
     */
     public deslogar(): Observable<void> {
        return new Observable(observer => {
            this.http.post<void>(this._url + '/deslogar', this._loginInfo?.userId).subscribe(() => {
                observer.next();
                observer.complete();
                this._loginEvent.next(undefined);
            }, error => {
                observer.error(error);
                observer.complete();
            })
        });
    }

}