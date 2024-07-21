import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Usuario } from 'src/app/model/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {

  user: Usuario;
  formGroup: FormGroup;
  
  constructor(private formBuilder: FormBuilder, private userService: UsuarioService, private toastController: ToastController, private activatedRoute: ActivatedRoute, private navController: NavController) {
      this.user = new Usuario();
      this.formGroup = this.formBuilder.group({
          "nome": [this.user.nome, Validators.compose([Validators.required])],
          "login": [this.user.login, Validators.compose([Validators.required])],
          "senha": [this.user.senha, Validators.compose([Validators.required])]
      });
     }

  ngOnInit() {
    let id = parseFloat(this.activatedRoute.snapshot.params['id']);
    if (!isNaN(id)){
        this.user = this.userService.buscarPorId(id);
    }

    this.formGroup.get('nome')?.setValue(this.user.nome);
    this.formGroup.get('login')?.setValue(this.user.login);
    this.formGroup.get('senha')?.setValue(this.user.senha);
  }

  salvar(){
    this.user.nome = this.formGroup.value.nome;
    this.user.login = this.formGroup.value.login;
    this.user.senha = this.formGroup.value.senha;
    if(this.userService.verificarLogin(this.user)){
        this.exibirMensagem("Esta placa já está cadastrada");
    }else{
        this.userService.salvar(this.user);
        this.exibirMensagem("Registro salvo com sucesso!");
        this.navController.navigateBack('/login');
    }   
  }

  async exibirMensagem(texto: string){
    const toast = await this.toastController.create({
        message: texto,
        duration: 1500
    });
    toast.present()
  }

}
