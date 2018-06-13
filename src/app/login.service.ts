import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { auth } from 'firebase/app';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private afAuth: AngularFireAuth, private sessao: SessionService) { }

  /**
   * 
   * @param email 
   * @param senha 
   */
  async login(mail: any, senha: any): Promise<any> {
    let rec;
    await this.afAuth.auth.signInWithEmailAndPassword(mail, senha).then(
      response => {
        console.log(response);
        this.sessao.setSession(response.user.uid, response.user.email);
        rec = true;
      }
    ).catch(
      r => {
        console.log(r);
        rec = false;
      }
    );
    return rec;
  }

  /**
   * 
   * @param email 
   * @param senha 
   */
  createUser(email: String, senha: String) {
    console.log({email: email, senha: senha});
  }
}
