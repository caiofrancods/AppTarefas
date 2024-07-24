import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/app/model/usuario';
import { ToastController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-dados',
    templateUrl: './dados.page.html',
    styleUrls: ['./dados.page.scss'],
})
export class DadosPage implements OnInit {
    user: Usuario;
    formGroup: FormGroup;

    constructor(private formBuilder: FormBuilder, private userService: UsuarioService, private navController: NavController, private toastController: ToastController, private activatedRoute: ActivatedRoute) {
        this.user = new Usuario();
        this.formGroup = this.formBuilder.group({
            "nome": [this.user.nome, Validators.compose([Validators.required])],
            "login": [this.user.login, Validators.compose([Validators.required])],
            "senha": [this.user.senha, Validators.compose([Validators.required])]
        });
    }

    ngOnInit() {
        if (!this.userService.verificarUsuarioLogado()) {
            this.navController.navigateBack('/login');
        }
        let userLogado = this.userService.dadosLogados();
        this.formGroup.get('nome')?.setValue(userLogado.nome);
        this.formGroup.get('login')?.setValue(userLogado.login);
        this.formGroup.get('senha')?.setValue(userLogado.senha);
    }
    async salvar() {
        let user2 = this.userService.dadosLogados();
        this.user.id = user2.id;
        this.user.nome = this.formGroup.value.nome;
        this.user.login = this.formGroup.value.login;
        this.user.senha = this.formGroup.value.senha;
        this.userService.salvar(this.user).then((json) => {
            this.user = <Usuario>(json);
            if (this.user) {
                this.userService.login(this.user);
                this.exibirMensagem('Registro salvo com sucesso!!!');
                this.navController.navigateBack('/inicio');
            }
        })
        .catch((erro => {
            this.exibirMensagem('Erro ao salvar o registro! Erro: ' + erro['mensage']);
        }));
    }
    async exibirMensagem(texto: string) {
        const toast = await this.toastController.create({
            message: texto,
            duration: 1500
        });
        toast.present()
    }


}
