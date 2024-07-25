import { Usuario } from "./usuario";

export class Tarefas {
    id: number;
    descricao: string;
    data: string;
    situacao: boolean;
    usuario: Usuario;

    constructor(){
        this.id = 0;
        this.descricao = "";
        this.data = "";
        this.situacao = false;
        this.usuario = new Usuario();
    }
}
