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

  constructor(private svc: LoginService) { }

  ngOnInit() {
  }

  /**
   * Acionado quando o usuário clicar no botão logar
   */
  async logar() {
    
    let r;
    r = await this.svc.login(this.email, this.senha);
    console.log('r ====== '+r);

    if (r){
      console.log('retornou true');
    }
    else {
      console.log('retornou false');
    }
  }

  /**
   * Acionado quando o usuário clicar no botão registrar-se
   */
  registrar() {
    console.log("invocado método registrar");
    this.svc.createUser(this.email, this.senha);

  }


}
