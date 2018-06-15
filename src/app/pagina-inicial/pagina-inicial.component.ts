import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { IgxNavigationDrawerComponent } from "igniteui-angular/main";
import { LoginService } from '../login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pagina-inicial',
  templateUrl: './pagina-inicial.component.html',
  styleUrls: ['./pagina-inicial.component.css']
})
export class PaginaInicialComponent implements OnInit {

  public navItems = [
    { name: "account_circle", text: localStorage['user'], route: "" },
    { name: "home", text: "Página Inicial", route: "" },
    { name: "games", text: "Criar Torneio", route: "" },
    { name: "sentiment_very_satisfied", text: "Adicionar Participantes", route: "" },
    { name: "sentiment_very_dissatisfied", text: "Excluir Participantes", route: "" },
    { name: "no_encryption", text: "Encerrar Incrições", route: "" },
    { name: "delete_forever", text: "Apagar Torneio", route: "" },
    { name: "casino", text: "Inserir Resultado Partida", route: "" },
    { name: "extension", text: "Alterar Resultado Partida", route: "" },
    { name: "exit_to_app", text: "Sair", route: "/login" }
  ];
  public selected = "Avatar";
  
  @ViewChild(IgxNavigationDrawerComponent)
  public drawer: IgxNavigationDrawerComponent;
  
  public drawerState = {
    miniTemplate: true,
    open: false,
    pin: false
  };
  
  /** Select item and close drawer if not pinned */
  public navigate(item) {
    this.selected = item.text;
    if (!this.drawer.pin) {
      this.drawer.close();
    }
    console.log(item.route);
  }
  constructor(private svc: LoginService, private rota: Router) { 
    this.auth();
  }

  private async auth(){
    let logado;

    logado = await this.svc.verificaToken();

    if (!logado) {
      this.rota.navigate(['/login'])
    }
  }

  ngOnInit() {}

}
