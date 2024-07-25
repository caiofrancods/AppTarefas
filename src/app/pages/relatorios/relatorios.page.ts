import { Component, OnInit } from '@angular/core';
import { TarefasService } from 'src/app/services/tarefas.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/app/model/usuario';
import { Tarefas } from 'src/app/model/tarefas';
import { NavController } from '@ionic/angular';
import * as moment from 'moment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
    formGroup: FormGroup;

    constructor(
        private tarefasService: TarefasService,
        private usuarioService: UsuarioService,
        private navController: NavController,
        private formBuilder: FormBuilder
    ) { 
        this.formGroup = this.formBuilder.group({
            "total": ['', Validators.required],
            "totalMes": ['', Validators.required],
            "totalSemana": ['', Validators.required]
        });
    }

    async ngOnInit() {
        this.usuarioLogado = this.usuarioService.dadosLogados();
        if (this.usuarioLogado) {
            await this.tarefasService.listar();
            this.calcularEstatisticas();
        } else {
            console.error('Nenhum usuário autenticado encontrado');
            this.navController.navigateBack('/login');
        }
    }

    calcularEstatisticas() {
        this.tarefasService.getTarefas().subscribe(tarefas => {
            const hoje = moment();
            const inicioMes = moment().startOf('month');
            const fimMes = moment().endOf('month');
            const inicioSemana = moment().startOf('week');
            const fimSemana = moment().endOf('week');

            const tarefasUsuario = tarefas.filter(tarefa => tarefa.usuario.id === this.usuarioLogado.id);

            this.totalNaoConcluidas = tarefasUsuario.filter(tarefa => tarefa.situacao === 0).length;
            this.totalNaoConcluidasMes = tarefasUsuario.filter(tarefa => tarefa.situacao === 0 && moment(tarefa.data).isBetween(inicioMes, fimMes)).length;
            this.totalNaoConcluidasSemana = tarefasUsuario.filter(tarefa => tarefa.situacao === 0 && moment(tarefa.data).isBetween(inicioSemana, fimSemana)).length;

            this.formGroup.get('total')?.setValue(this.totalNaoConcluidas);
            this.formGroup.get('totalMes')?.setValue(this.totalNaoConcluidasMes);
            this.formGroup.get('totalSemana')?.setValue(this.totalNaoConcluidasSemana);
        });
    }
}
