import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-dados',
  templateUrl: './dados.page.html',
  styleUrls: ['./dados.page.scss'],
})
export class DadosPage implements OnInit {

  constructor(private userService: UsuarioService, private navController: NavController) { }

  ngOnInit() {
    if (!this.userService.verificarUsuarioLogado()) {
        this.navController.navigateBack('/login');
    }
  }

}
