import { Component, OnInit, ViewChild } from '@angular/core';
import { LoginService } from '../login.service';
import { IgxDialogComponent } from 'igniteui-angular/main';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public email: String;
  public senha: String;

  msg = '';
  title = '';

  @ViewChild(IgxDialogComponent)
  public dialog: IgxDialogComponent;

  constructor(private svc: LoginService) {
    console.log(localStorage['token']);
   }

  ngOnInit() {
  }

  /**
   * Acionado quando o usuário clicar no botão logar
   */
  async logar() {

    if (this.email == "" || this.email == null || 
        this.senha == "" || this.senha == null) {
      return false;
    }
    
    let r;
    r = await this.svc.login(this.email, this.senha);

    if (r){
      console.log('chama a rota');
      this.title = "Sucesso";
      this.msg = "Usuário autenticado com sucesso";
      this.dialog.open();
    }
    else {
      console.log('exibe erros');
      this.title = "Falha ao tentar fazer login";
      this.msg = "Verifique os dados e tente novamente.";    
      this.dialog.open();
    }

    console.log(localStorage['token']);
  }

  /**
   * Acionado quando o usuário clicar no botão registrar-se
   */
  async registrar() {

    if (this.email == "" || this.email == null || 
        this.senha == "" || this.senha == null) {
      return false;
    }
    
    let r;
    r = await this.svc.createUser(this.email, this.senha);

    if (r){
      console.log('usuário criado');
      this.title = "Sucesso";
      this.msg = "O usuário foi criado com sucesso";
      this.dialog.open();
    }
    else {
      console.log('falha ao criar');
      this.title = "Falha ao tentar criar usuário";
      this.msg = "Verifique os dados e tente novamente.";
      this.dialog.open();
    }

    console.log(localStorage['token']);

  }


}
