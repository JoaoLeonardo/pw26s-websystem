import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http"
import { Observable, Subject } from "rxjs";

// environment
import { environment } from "src/environments/environment";

// aplicação
import { LoginRequest } from "../models/login-request";

@Injectable({ providedIn: 'root' })
export abstract class LoginService {

    /**
     * @description Armazena a url base do sistema
     */
    private _url = environment.api;

    /**
     * @description Flag que indica usuário logado
     */
    private _isAuthenticated: boolean;

    /**
     * @description Evento de login
     */
    private _loginEvent: Subject<boolean>;

    constructor(private http: HttpClient) {
        this._loginEvent = new Subject();
        this._isAuthenticated = false;
    }

    /**
     * @description Retorna as informações do usuário logado
     */
    public get authInfo(): boolean {
        return this._isAuthenticated;
    }

    /**
     * @description Observable do evento de login
     */
    public get onLoginEvent(): Observable<boolean> {
        return this._loginEvent.asObservable();
    }

    /**
     * @description Loga no sistema
     * @returns Id do usuário
     * @param request Request de login com email/username e senha
     */
    public login(request: LoginRequest): Observable<boolean> {
        return new Observable(observer => {
            if (!request) {
                observer.error({ message: 'É obrigatório informar um nome de usuário e uma senha para logar no sistema.' });
                observer.complete();
            }

            const headers = new HttpHeaders({ authorization: 'Basic ' + btoa(request.username + ':' + request.password) });

            this.http.post<{ name: string }>(this._url + 'login', headers).subscribe(res => {
                this._isAuthenticated = res != null && res['name'] != null;
                this._loginEvent.next(this._isAuthenticated);
                observer.next(this._isAuthenticated);
                observer.complete();
            }, error => {
                observer.error(error);
                observer.complete();
            })
        });
    }

    /**
     * @description Desloga do sistema
     */
    public logout(): Observable<void> {
        return new Observable(observer => {
            this.http.post<void>(this._url + 'logout', {}).subscribe(() => {
                observer.next();
                observer.complete();
                this._isAuthenticated = false;
                this._loginEvent.next(this._isAuthenticated);
            }, error => {
                observer.error(error);
                observer.complete();
            })
        });
    }

}