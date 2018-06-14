import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public email: String;
  public senha: String;

  constructor(private svc: LoginService) {
    console.log(localStorage['token']);
   }

  ngOnInit() {
  }

  /**
   * Acionado quando o usuário clicar no botão logar
   */
  async logar() {
    
    let r;
    r = await this.svc.login(this.email, this.senha);

    if (r){
      console.log('chama a rota');
    }
    else {
      console.log('exibe erros');
    }

    console.log(localStorage['token']);
  }

  /**
   * Acionado quando o usuário clicar no botão registrar-se
   */
  async registrar() {
    
    let r;
    r = await this.svc.createUser(this.email, this.senha);

    if (r){
      console.log('usuário criado');
    }
    else {
      console.log('falha ao criar');
    }

    console.log(localStorage['token']);

  }


}
