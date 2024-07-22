import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Usuario } from 'src/app/model/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import { MaskitoElementPredicate, MaskitoOptions } from '@maskito/core';

@Component({
    selector: 'app-cadastro',
    templateUrl: './cadastro.page.html',
    styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {

    user: Usuario;
    formGroup: FormGroup;
    verificarLogin: Boolean;

    readonly predicate: MaskitoElementPredicate = async (el) => (el as HTMLIonInputElement).getInputElement();

    constructor(private formBuilder: FormBuilder, private userService: UsuarioService, private toastController: ToastController, private activatedRoute: ActivatedRoute, private navController: NavController) {
        this.user = new Usuario();
        this.verificarLogin = false;
        this.formGroup = this.formBuilder.group({
            "nome": [this.user.nome, Validators.compose([Validators.required])],
            "login": [this.user.login, Validators.compose([Validators.required])],
            "senha": [this.user.senha, Validators.compose([Validators.required])]
        });
    }

    ngOnInit() {
    }

    async salvar() {
        this.user.nome = this.formGroup.value.nome;
        this.user.login = this.formGroup.value.login;
        this.user.senha = this.formGroup.value.senha;



        this.userService.verificarLogin(this.user)
            .then((json) => {
                this.verificarLogin = <Boolean>(json);

                if (!this.verificarLogin) {
                    this.userService.salvar(this.user)
                        .then((json) => {
                            this.user = <Usuario>(json);
                            if (this.user) {
                                this.exibirMensagem('Registro salvo com sucesso!!!');
                                this.navController.navigateBack('/login');
                            }
                        })
                        .catch((erro => {
                            this.exibirMensagem('Erro ao salvar o registro! Erro: ' + erro['mensage']);
                        }));
                }else{
                    this.exibirMensagem('Login já existente no sistema.');
                    this.formGroup.get('login')?.setValue("");
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
