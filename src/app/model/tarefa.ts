import { Usuario } from "./usuario";

export class Tarefa {
    id: number;
    descricao: string;
    data: string;
    situacao: number;
    usuario: Usuario;

    constructor(){
        this.id = 0;
        this.descricao = "";
        this.data = "";
        this.situacao = 0;
        this.usuario = new Usuario;
    }
}
