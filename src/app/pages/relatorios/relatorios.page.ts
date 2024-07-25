import { Component, OnInit } from '@angular/core';
import { TarefasService } from 'src/app/services/tarefas.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/app/model/usuario';
import { Tarefas } from 'src/app/model/tarefas';
import * as moment from 'moment';

@Component({
  selector: 'app-relatorios',
  templateUrl: './relatorios.page.html',
  styleUrls: ['./relatorios.page.scss'],
})
export class RelatoriosPage implements OnInit {

  usuarioLogado!: Usuario;
  totalNaoConcluidas: number = 0;
  totalNaoConcluidasMes: number = 0;
  totalNaoConcluidasSemana: number = 0;

  constructor(
    private tarefasService: TarefasService,
    private usuarioService: UsuarioService
  ) { }

  ngOnInit() {
    this.usuarioLogado = this.usuarioService.recuperarAutenticacao();
    if (this.usuarioLogado) {
      this.calcularEstatisticas();
    } else {
      console.error('Nenhum usuário autenticado encontrado');
    }
  }

  calcularEstatisticas() {
    this.tarefasService.getTarefas().subscribe(tarefas => {
      const hoje = moment();
      const inicioMes = moment().startOf('month');
      const fimMes = moment().endOf('month');
      const inicioSemana = moment().startOf('week');
      const fimSemana = moment().endOf('week');

      // Corrigindo a comparação do id do usuário
      const tarefasUsuario = tarefas.filter(tarefa => tarefa.usuario.id === this.usuarioLogado.id);

      this.totalNaoConcluidas = tarefasUsuario.filter(tarefa => !tarefa.situacao).length;
      this.totalNaoConcluidasMes = tarefasUsuario.filter(tarefa => !tarefa.situacao && moment(tarefa.data).isBetween(inicioMes, fimMes)).length;
      this.totalNaoConcluidasSemana = tarefasUsuario.filter(tarefa => !tarefa.situacao && moment(tarefa.data).isBetween(inicioSemana, fimSemana)).length;
    });
  }
}
