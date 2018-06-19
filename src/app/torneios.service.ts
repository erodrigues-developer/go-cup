import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpResponse } from 'selenium-webdriver/http';

@Injectable({
  providedIn: 'root'
})
export class TorneiosService {

  private idTorneioSelecionado = new Subject<String>();

  setIdTorneioSelecionado(id) {
    this.idTorneioSelecionado.next(id);
  }

  getIdTorneioSelecionado(): Observable<String> {
    return this.idTorneioSelecionado.asObservable();
  }

  url_api = "";

  constructor(private db: AngularFireDatabase, private http: HttpClient) { }

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

  async salvar(nome, url): Promise<any> {
    let retorno = false;

    this.url_api = 'https://api.challonge.com/v1/tournaments.json'+
                                '?api_key=HFQp64rnt3zSP216dLZ1A3KmIXjkyCHf66W4bwAu'+
                                '&tournament[name]='+nome+
                                '&tournament[url]='+url;
    await this.http.post(this.url_api, {}).toPromise().then(
      r => {
        //console.log(r);
        this.salvarFirebase(r);
        retorno = true;
      }
    ).catch(
      e => {
        retorno = false;
        console.log(e);
      }
    )

    return retorno;
  }

  private async salvarFirebase(v: any): Promise<any>{
    let ret = false;

    let dados = {
      id: v.tournament.id,
      nome:  v.tournament.name,
      url: v.tournament.url,
      link:  v.tournament.full_challonge_url
    };

    await this.db.list("usuarios/" + localStorage.token + "/torneios").push(dados).then(
      r => {
        ret = true;
      },
      e=> {
        ret = false;
      }
    );
    
    return ret;
  }
    
}
