import { Permissao } from './permissao';

export interface LoginInfo {
    userId: number;
    permissoes: Permissao[];
    access_token: string;
    token_type: string;
}