import { Injectable } from '@angular/core';
import { Tarefas } from '../model/tarefas';
import { firstValueFrom, Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UsuarioService } from './usuario.service';
import { Usuario } from '../model/usuario';

@Injectable({
  providedIn: 'root'
})
export class TarefasService {

  private tarefas: Tarefas[] = [];
  private user: Usuario;

  httpHeaders = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  }

  url: string = 'https://api-atividade03.odiloncorrea.com/tarefa';

  constructor(private httpClient: HttpClient, private userService: UsuarioService) {
    this.user = this.userService.dadosLogados();
  }

  async salvar(tarefas: Tarefas): Promise<Tarefas> {
    tarefas.situacao = tarefas.situacao ? 1 : 0;

    const tarefaPayload = {
      id: tarefas.id,
      descricao: tarefas.descricao,
      data: tarefas.data,
      situacao: tarefas.situacao,
      usuario: {
        id: this.user.id,
        nome: this.user.nome,
        login: this.user.login,
        senha: this.user.senha
      }
    };

    if (tarefas.id === 0) {
      return await firstValueFrom(this.httpClient.post<Tarefas>(this.url, JSON.stringify(tarefaPayload), this.httpHeaders));
    } else {
      return await firstValueFrom(this.httpClient.put<Tarefas>(this.url, JSON.stringify(tarefaPayload), this.httpHeaders));
    }
  }

  async listar(): Promise<Tarefas[]> {
    const tarefas = await firstValueFrom(this.httpClient.get<Tarefas[]>(`${this.url}/${this.user.id}/usuario`));
    this.tarefas = tarefas;
    return this.tarefas;
  }

  async buscarPorId(id: number): Promise<Tarefas> {
    let urlAuxiliar = `${this.url}/${id}`;
    return await firstValueFrom(this.httpClient.get<Tarefas>(urlAuxiliar));
  }

  async excluir(id: number): Promise<Tarefas> {
    let urlAuxiliar = `${this.url}/${id}`;
    return await firstValueFrom(this.httpClient.delete<Tarefas>(urlAuxiliar));
  }

  getTarefasNaoConcluidas(): Tarefas[] {
    return this.tarefas.filter(tarefa => tarefa.situacao === 0);
  }

  getTarefasNaoConcluidasNoMesAtual(): Tarefas[] {
    const currentMonth = new Date().getMonth();
    return this.tarefas.filter(tarefa => {
      const tarefaDate = new Date(tarefa.data);
      return tarefa.situacao === 0 && tarefaDate.getMonth() === currentMonth;
    });
  }

  getTarefasNaoConcluidasNaSemanaAtual(): Tarefas[] {
    const currentDate = new Date();
    const startOfWeek = currentDate.getDate() - currentDate.getDay();
    const endOfWeek = startOfWeek + 6;

    return this.tarefas.filter(tarefa => {
      const tarefaDate = new Date(tarefa.data);
      return tarefa.situacao === 0 &&
        tarefaDate.getDate() >= startOfWeek &&
        tarefaDate.getDate() <= endOfWeek;
    });
  }

  getTarefas(): Observable<Tarefas[]> {
    return of(this.tarefas);
  }
}
