import { Component, OnInit } from '@angular/core';
import { Tarefas } from 'src/app/model/tarefas';
import { TarefasService } from 'src/app/services/tarefas.service';
import { ToastController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-tarefas',
  templateUrl: './tarefas.page.html',
  styleUrls: ['./tarefas.page.scss'],
})
export class TarefasPage implements OnInit {

  tarefas: Tarefas[];

  constructor(private toastController: ToastController, private navController: NavController, private alertController: AlertController, private tarefasService: TarefasService, private loadingController: LoadingController) {
    this.tarefas = [];
  }

  ngOnInit() {}

  async ionViewWillEnter() {
    this.carregarLista();
  }

  async carregarLista() {
    this.exibirLoader();
    await this.tarefasService.listar().then((json) => {
      this.tarefas = <Tarefas[]>(json);
    });
    this.fecharLoader();
  }

  exibirLoader() {
    this.loadingController.create({
      message: 'Carregando...'
    }).then((res) => {
      res.present();
    });
  }

  fecharLoader() {
    setTimeout(() => {
      this.loadingController.dismiss().then(() => {
      }).catch((erro) => {
        console.log('Erro: ', erro);
      });
    }, 500);
  }

  async excluir(tarefas: Tarefas) {
    const alert = await this.alertController.create({
      header: 'Confirma a exclusão?',
      message: tarefas.descricao,
      buttons: [
        {
          text: 'Cancelar'
        },
        {
          text: 'Confirmar',
          cssClass: 'danger',
          handler: () => {
            this.tarefasService.excluir(tarefas.id)
              .then(() => {
                this.carregarLista();
                this.exibirMensagem('Registro excluído com sucesso!!!');
              })
              .catch(() => {
                this.exibirMensagem('Erro ao excluir o registro.');
              });
          }
        }
      ]
    });
    await alert.present();
  }
  
  async exibirMensagem(texto: string) {
    const toast = await this.toastController.create({
      message: texto,
      duration: 1500
    });
    toast.present();
  }
}


