import { Component, OnInit } from '@angular/core';
import { Tarefas } from 'src/app/model/tarefas';
import { TarefasService } from 'src/app/services/tarefas.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; 
import { ToastController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Usuario } from 'src/app/model/usuario'; // Importe o modelo de usuário
import { UsuarioService } from 'src/app/services/usuario.service'; // Importe o serviço de usuário

@Component({
  selector: 'app-add-tarefas',
  templateUrl: './add-tarefas.page.html',
  styleUrls: ['./add-tarefas.page.scss'],
})
export class AddTarefasPage implements OnInit {

  tarefas: Tarefas;
  formGroup: FormGroup;
  usuarioLogado!: Usuario; // Variável para armazenar o usuário autenticado

  constructor(
    private formBuilder: FormBuilder,
    private tarefasService: TarefasService,
    private toastController: ToastController,
    private activatedRoute: ActivatedRoute,
    private navController: NavController,
    private usuarioService: UsuarioService // Injete o serviço de usuário
  ) {
    this.tarefas = new Tarefas();
    this.formGroup = this.formBuilder.group({
      'descricao': [this.tarefas.descricao, Validators.compose([Validators.required])],
      'data': [this.tarefas.data, Validators.compose([Validators.required])],
      'situacao': [this.tarefas.situacao, Validators.compose([Validators.required])],
    });
  }

  ngOnInit() {
    // Recupera o usuário autenticado ao inicializar o componente
    this.usuarioLogado = this.usuarioService.recuperarAutenticacao();
    
    let id = parseFloat(this.activatedRoute.snapshot.params['id']);

    if (!isNaN(id)) {
      this.tarefasService.buscarPorId(id).then((json) => {
        this.tarefas = <Tarefas>(json);
        this.formGroup.get('descricao')?.setValue(this.tarefas.descricao);
        this.formGroup.get('data')?.setValue(this.tarefas.data);
        this.formGroup.get('situacao')?.setValue(this.tarefas.situacao);
      });
    }
  }

  salvar() {
    this.tarefas.descricao = this.formGroup.value.descricao;
    this.tarefas.data = this.formGroup.value.data;
    this.tarefas.situacao = this.formGroup.value.situacao;
    this.tarefas.usuario = this.usuarioLogado; // Atribui o objeto completo de Usuario

    this.tarefasService.salvar(this.tarefas).then((json) => {
      this.tarefas = <Tarefas>(json);
      if (this.tarefas) {
        this.exibirMensagem("Registro salvo com sucesso!!!");
        this.navController.navigateBack('/tarefas');
      }
    }).catch((erro) => {
      this.exibirMensagem("Erro ao salvar o registro! Erro: " + erro['message']);
    });
  }

  async exibirMensagem(texto: string) {
    const toast = await this.toastController.create({
      message: texto,
      duration: 1500
    });
    toast.present();
  }

}
