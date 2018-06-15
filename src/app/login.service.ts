import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { auth } from 'firebase/app';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabase } from 'angularfire2/database';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private afAuth: AngularFireAuth, private db: AngularFireDatabase, private rota: Router) { }

  /**
   * Recebe os dados de login
   * Chama o método de login do firebase passando email e senha
   * 
   * @param email 
   * @param senha 
   * @return boolean  retorno
   */
  async login(mail: any, senha: any): Promise<any> {

    let retorno = false;

    await this.afAuth.auth.signInWithEmailAndPassword(mail, senha).then(
      response => {

        localStorage.setItem('token', this.afAuth.auth.currentUser.uid);
        localStorage.setItem('user', this.afAuth.auth.currentUser.email);

        this.log();

        retorno = true;
      }
    ).catch(
      r => {
        retorno = false;
      }
    );
    
    return retorno;
  }

  /**
   * Finaliza a sessão
   */
  async logout () {
    
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    this.afAuth.auth.signOut();
  }

  /**
   * Atualiza o horário do último login do usuário
   */
  private log () {

    let ref = this.db.createPushId()

    this.db.object("usuarios/" + localStorage['token'] + "/").update(
      {
        ultimo_login: new Date()
      }
    );

  }

  /**
   * Recebe os dados e instancia o firebase auth
   * Cria o usuário no firebase
   * Em seguida cria um diretório no db para esse usuário
   * @param email 
   * @param senha 
   */
  async createUser(mail: any, senha: any): Promise<any> {

    let retorno = false;
    
    await this.afAuth.auth.createUserWithEmailAndPassword(mail, senha).then(
      response => {
        localStorage['token'] = response.user.uid;
        localStorage['user'] = response.user.email;
        this.criarDiretorio(response.user.uid, response.user.email);
        retorno = true;
      }
    )
    .catch(
      r => {
        retorno = false;
      }
    );

    return retorno;
  }

  /**
   * Cria um diretório para o usuário
   * @param id 
   * @param mail 
   */
  private async criarDiretorio(id: any, mail: any): Promise<any> {

    let retorno = false;

    let ref = this.db.createPushId()
    

    await this.db.object("usuarios/" + id + "/").update(
      {
        email: mail
      }
    )
    .then(
      r => {
        retorno = true;
      }
    );
    
    return retorno;
  }

  /**
   * Verifica se existe uma sessão ativa
   * E se a sessão expirou
   */
  async verificaToken(): Promise<any> {

    let retorno = false;
    let hora_atual;
    let ultimo_login;    

    if (localStorage['token'] == null){
      console.log('faça login');
      return false;
    }

    await this.db.database.ref( "usuarios/" + localStorage['token'] ).once( 'value').then(
      r => {
        ultimo_login = new Date(r.val().ultimo_login);
        hora_atual = new Date();
      }
    ).catch(
      e => {
        console.log(e.val());
      }
    );

    let tempoLogado = Math.abs(hora_atual - ultimo_login) / 36e5;

    if (tempoLogado < 2){
      retorno = true;
    }
    else {
      this.logout();
      retorno = false;
    }

    return retorno;
  }
}
