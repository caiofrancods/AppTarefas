import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Usuario } from 'src/app/model/usuario';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {

    user: User;
    formGroup: FormGroup;
    autenticacao: Usuario;

    constructor(private formBuilder: FormBuilder, private userService: UsuarioService, private toastController: ToastController, private activatedRoute: ActivatedRoute, private navController: NavController) {
        this.autenticacao = new Usuario();
        this.user = new User();
        this.formGroup = this.formBuilder.group({
            "login": [this.user.login, Validators.compose([Validators.required])],
            "senha": [this.user.senha, Validators.compose([Validators.required])],
        });

    }

    ngOnInit() {
    }

    autenticar(){
        this.user.login = this.formGroup.value.login;
        this.user.senha = this.formGroup.value.senha;

        this.userService.autenticar(this.user.login, this.user.senha)
            .then((json) => {
                this.autenticacao = <Usuario>(json);
                if (this.autenticacao) {
                    this.exibirMensagem('Bem-Vindo!');
                    this.userService.login(this.autenticacao);
                    this.navController.navigateBack('/inicio');
                }else{
                    this.exibirMensagem('Login e/ou senha incorreto!');
                    this.formGroup.get('login')?.setValue("");
                    this.formGroup.get('senha')?.setValue("");
                }
            })
            .catch((erro => {
                this.exibirMensagem('Erro ao realizar o login! Erro: ' + erro['mensage']);
            }));
    }

    async exibirMensagem(texto: string){
        const toast = await this.toastController.create({
            message: texto,
            duration: 1500
        });
        toast.present()
      }

}
class User {
    login: string;
    senha: string;

    constructor() {
        this.login = "";
        this.senha = "";
    }
}
