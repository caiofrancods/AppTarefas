import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-relatorio',
  templateUrl: './relatorio.page.html',
  styleUrls: ['./relatorio.page.scss'],
})
export class RelatorioPage implements OnInit {

  constructor(private userService: UsuarioService, private navController: NavController) { }

  ngOnInit() {
    if (!this.userService.verificarUsuarioLogado()) {
        this.navController.navigateBack('/login');
    }
  }

}
