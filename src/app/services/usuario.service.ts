import { Injectable } from '@angular/core';
import { Usuario } from '../model/usuario';
import { firstValueFrom } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class UsuarioService {

    httpHeaders = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }
    url: string = 'https://api-atividade03.odiloncorrea.com/usuario';

    constructor(private httpClient: HttpClient) { }

    async salvar(user: Usuario): Promise<Usuario> {
        if (user.id == 0) {
            return await firstValueFrom(this.httpClient.post<Usuario>(this.url, JSON.stringify(user), this.httpHeaders));
        } else {
            return await firstValueFrom(this.httpClient.put<Usuario>(this.url, JSON.stringify(user), this.httpHeaders));
        }
    }

    async listar(): Promise<Usuario[]> {
        return await firstValueFrom(this.httpClient.get<Usuario[]>(this.url));
    }

    async buscarPorId(id: number): Promise<Usuario> {
        let urlAuxiliar = this.url + "/" + id;
        return await firstValueFrom(this.httpClient.get<Usuario>(urlAuxiliar));
    }

    async excluir(id: number): Promise<Usuario> {
        let urlAuxiliar = this.url + "/" + id;
        return await firstValueFrom(this.httpClient.delete<Usuario>(urlAuxiliar));
    }

    async verificarLogin(user: Usuario): Promise<boolean> {
        let urlAuxiliar = this.url + "/" + user.login + '/login/exists';
        return await firstValueFrom(this.httpClient.get<boolean>(urlAuxiliar));
    }

    async autenticar(login: String, senha: String){
        let urlAuxiliar = this.url + "/" + login + "/" + senha + '/authenticate';
        return await firstValueFrom(this.httpClient.get<Usuario>(urlAuxiliar));
        
    }

    login(user: Usuario){
        localStorage.setItem('userLogado', JSON.stringify(user));
    }

    dadosLogados(): Usuario{
        let userLogado = JSON.parse(localStorage.getItem('userLogado') || '');
        return userLogado;
    }

    sair(){
        localStorage.setItem('userLogado', JSON.stringify(false));
    }
    verificarUsuarioLogado(): Boolean{
        let userLogado = JSON.parse(localStorage.getItem('userLogado') || '');
        if(userLogado){
            return true;
        }else{
            return false;
        }
    }

}
