import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TorneiosService {

  constructor(private db: AngularFireDatabase) { }

  async getTorneios():Promise<any[]>{
    let v = [];
    await this.db.database.ref( "usuarios/" + localStorage['token'] + "/torneios" ).once( 'value').then(
      r => {
        v = r.val();
      }
    ).catch(
      e => {
        console.log(e);
      }
    );
    
    let value = [];
    for (let key in v){
      value.push({
        id: v[key].id,
        nome: v[key].nome,
        url: v[key].url,
        key: key
      });
    }
    
    return value;
  }
    
}
