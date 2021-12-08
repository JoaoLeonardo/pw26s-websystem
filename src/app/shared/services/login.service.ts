import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
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
     * @description Evento de login
     */
    private _loginEvent: Subject<boolean>;

    constructor(
        private _http: HttpClient,
        private _router: Router,
    ) {
        this._loginEvent = new Subject();
    }

    /**
     * @description Retorna as informações do usuário logado
     * // TODO: tipar
     */
    public get authInfo() {
        return localStorage.getItem("access_token");
    }

    /**
     * @description Retorna true se o usuário estiver autenticado
     * // TODO: tipar
     */
    public get isAuthenticated() {
        return !!localStorage.getItem("access_token");
    }

    /**
     * @description Observable do evento de login
     */
    public get onLoginEvent(): Observable<boolean> {
        return this._loginEvent.asObservable();
    }

    /**
     * @description Loga no sistema
     * @returns Flag que identifica sucesso do login
     * @param request Request de login com email/username e senha
     */
    public login(request: LoginRequest): Observable<boolean> {
        return new Observable(observer => {
            if (!request) {
                observer.error({ message: 'É obrigatório informar um nome de usuário e uma senha para logar no sistema.' });
                observer.complete();
            }

            const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
            const body = 'username=' + request.username + '&password=' + request.password;

            this._http.post<{ access_token: string }>(this._url + 'login', body, { headers: headers }).subscribe(response => {
                const token = response['access_token'];

                if (response['access_token']) {
                    localStorage.setItem('access_token', token);
                } else {
                    localStorage.removeItem('access_token')
                }

                observer.next(this.isAuthenticated);
                this._loginEvent.next(this.isAuthenticated);
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
    public logout() {
        localStorage.removeItem("access_token");
        this._loginEvent.next(false);
        this._router.navigateByUrl("").then(res => res);
    }

}