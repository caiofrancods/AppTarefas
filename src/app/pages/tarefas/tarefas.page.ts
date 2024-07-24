import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-tarefas',
  templateUrl: './tarefas.page.html',
  styleUrls: ['./tarefas.page.scss'],
})
export class TarefasPage implements OnInit {

  constructor(private userService: UsuarioService, private navController: NavController) { }

  ngOnInit() {
    if (!this.userService.verificarUsuarioLogado()) {
        this.navController.navigateBack('/login');
    }
  }

}
