import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { IgxNavigationDrawerComponent } from "igniteui-angular/main";

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  
  public navItems = [
    { name: "account_circle", text: localStorage['user'] },
    { name: "home", text: "Página Inicial" },
    { name: "games", text: "Criar Torneio" },
    { name: "sentiment_very_satisfied", text: "Adicionar Participantes" },
    { name: "sentiment_very_dissatisfied", text: "Excluir Participantes" },
    { name: "no_encryption", text: "Encerrar Incrições" },
    { name: "delete_forever", text: "Apagar Torneio" },
    { name: "casino", text: "Inserir Resultado Partida" },
    { name: "extension", text: "Alterar Resultado Partida" },
    { name: "exit_to_app", text: "Sair" }
  ];
  public selected = "Avatar";
  
  @ViewChild(IgxNavigationDrawerComponent)
  public drawer: IgxNavigationDrawerComponent;
  
  public drawerState = {
    miniTemplate: true,
    open: true,
    pin: false
  };
  
  /** Select item and close drawer if not pinned */
  public navigate(item) {
    this.selected = item.text;
    if (!this.drawer.pin) {
      this.drawer.close();
    }
  }
  constructor() { }

  ngOnInit() {
  }
  
}
