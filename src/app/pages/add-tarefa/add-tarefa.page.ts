import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-add-tarefa',
  templateUrl: './add-tarefa.page.html',
  styleUrls: ['./add-tarefa.page.scss'],
})
export class AddTarefaPage implements OnInit {

  constructor(private userService: UsuarioService, private navController: NavController) { }

  ngOnInit() {
    if (!this.userService.verificarUsuarioLogado()) {
        this.navController.navigateBack('/login');
    }
  }

}
