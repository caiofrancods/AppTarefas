import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

    menu = [
        {titulo: "Tarefas", rota: "/tarefas", icone: "checkbox-outline", cor: "primary"}, 
        {titulo: "Meus Dados", rota: "/dados", icone: "person-outline", cor: "primary"}, 
        {titulo: "Relatório", rota: "/relatorio", icone: "document-text-outline", cor: "primary"}, 
        {titulo: "Sair", rota: "/", icone: "log-out-outline", cor: "primary"}
      ];
      

  constructor() { }

  ngOnInit() {
  }

}
