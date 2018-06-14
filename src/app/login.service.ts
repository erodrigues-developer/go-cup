import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { auth } from 'firebase/app';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private afAuth: AngularFireAuth, private db: AngularFireDatabase) { }

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
        localStorage['token'] = this.afAuth.auth.currentUser.uid;
        localStorage['user'] = this.afAuth.auth.currentUser.email;
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
        console.log(r);
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
}
