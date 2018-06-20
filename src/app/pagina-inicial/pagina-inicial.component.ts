import { Component, OnInit, ViewChild, ViewEncapsulation, Input } from '@angular/core';
import { IgxNavigationDrawerComponent } from "igniteui-angular/main";
import { LoginService } from '../login.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TorneiosService } from '../torneios.service';

@Component({
  selector: 'app-pagina-inicial',
  templateUrl: './pagina-inicial.component.html',
  styleUrls: ['./pagina-inicial.component.css']
})
export class PaginaInicialComponent implements OnInit {

  sub: Subscription;
  
  public idTorneio = "";
  public keyTorneio = "";

  public navItems;
  public selected = "Avatar";
  
  @ViewChild(IgxNavigationDrawerComponent)
  public drawer: IgxNavigationDrawerComponent;
  
  public drawerState = {
    miniTemplate: true,
    open: false,
    pin: false
  };
  
  constructor(private svc: LoginService, private rota: Router, private torneio: TorneiosService) { 
  }
  
  ngOnInit() {
    this.auth();
  
    this.sub = this.torneio.getIdTorneioSelecionado().subscribe(
      r => {
        this.setIdTorneio(r);
      }
    );

    this.sub = this.torneio.getKeyTorneioSelecionado().subscribe(
      r => {
        this.setKeyTorneio(r);
      }
    );
    this.setMenu();
  }



  /** Select item and close drawer if not pinned */
  public navigate(item) {
    this.selected = item.text;
    if (!this.drawer.pin) {
      this.drawer.close();
    }
    console.log(item.route);

    if (item.route != "/pagina-inicial/form-participantes/"){
      if (item.route == "/pagina-inicial"){
        window.location.href = "http://localhost:4200/pagina-inicial";
        return false;
      }

      this.rota.navigate([item.route]);
    }
  }

  private async auth(){
    let logado;

    logado = await this.svc.verificaToken();

    if (!logado) {
      this.rota.navigate(['/login'])
    }
  }

  /**
   * Setter ID
   * @param id 
   */
  setIdTorneio(id){
    
    this.idTorneio = id;

    this.setMenu();    
  }

  /**
   * Setter KEY
   * @param key 
   */
  setKeyTorneio(key) {

    this.keyTorneio = key;

    this.setMenu();
  }

  /**
   * Define as opções do Menu Sidebar
   */
  setMenu(){
    this.navItems = [
      { name: "account_circle", text: localStorage['user'], route: "" },
      { name: "home", text: "Página Inicial", route: "/pagina-inicial" },
      { name: "games", text: "Criar Torneio", route: "/pagina-inicial/form-torneios" },
      { name: "sentiment_very_satisfied", text: "Adicionar Participantes", 
          route: "/pagina-inicial/form-participantes/" + this.idTorneio + "/" + this.keyTorneio },
      { name: "no_encryption", text: "Encerrar Incrições", route: "" },
      { name: "delete_forever", text: "Apagar Torneio", route: "" },
      { name: "casino", text: "Inserir Resultado Partida", route: "" },
      { name: "extension", text: "Alterar Resultado Partida", route: "" },
      { name: "exit_to_app", text: "Sair", route: "/login" }
    ];
  }

}
