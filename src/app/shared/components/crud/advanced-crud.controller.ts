import { Injectable } from "@angular/core";

// aplicação
import { AdvancedCrudCard } from "./advanced-crud-card";

@Injectable()
export class AdvancedCrudController<T> {

    /**
     * @description Armazena os cads da tela
     */
    private _cardList: AdvancedCrudCard<T>[];

    constructor() { 
        this._cardList = [];
    }

    /**
     * @description Adiciona o card na lista de cards da tela
     */
    public registerCard(card: AdvancedCrudCard<T>) {
        this._cardList.push(card);
    }

    /**
     * @description Retorna a lista de cards da tela
     */
    public get cardList(): AdvancedCrudCard<T>[] {
        return this._cardList;
    }

}