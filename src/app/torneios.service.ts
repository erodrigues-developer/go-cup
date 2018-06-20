import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpResponse } from 'selenium-webdriver/http';

@Injectable({
  providedIn: 'root'
})
export class TorneiosService {
  
  url_api = "";

  private idTorneioSelecionado = new Subject<String>();
  private keyTorneioSelecionado = new Subject<String>();

  
  constructor(private db: AngularFireDatabase, private http: HttpClient) { }

  /**
   * Serviço responsável por setar o id do torneio selecionado na lista
   * da página inicial
   * @param id 
   */
  setIdTorneioSelecionado(id) {
    this.idTorneioSelecionado.next(id);
  }

  /**
   * Serviço responsável por obter o id do torneio selecionado na lista
   * da página inicial
   */
  getIdTorneioSelecionado(): Observable<String> {
    return this.idTorneioSelecionado.asObservable();
  }

  /**
   * Serviço responsável por setar o id do torneio selecionado na lista
   * da página inicial
   * @param key 
   */
  setKeyTorneioSelecionado(key) {
    this.keyTorneioSelecionado.next(key);
  }

  /**
   * Serviço responsável por obter o id do torneio selecionado na lista
   * da página inicial
   */
  getKeyTorneioSelecionado(): Observable<String> {
    return this.keyTorneioSelecionado.asObservable();
  }

  /**
   * Responsável por buscar os dados na base dados do firebase
   */
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

  /**
   * Responsável por buscar os dados do torneio através da api
   * do challonge
   * @param id 
   */
  async getTorneioId(id): Promise<any[]> {
    let value: any = [];

    this.url_api = '/v1/tournaments/' + id + '.json'+
                                '?api_key=HFQp64rnt3zSP216dLZ1A3KmIXjkyCHf66W4bwAu';
    await this.http.get(this.url_api, {}).toPromise().then(
      r => {
        value = r;
      }
    ).catch(
      e => {
        console.log(e);
      }
    )
    // console.log(value);

    return value;
  }

  /**
   * Responsável por salvar um novo torneio atraves da api do challonge
   * @param nome 
   * @param url 
   */
  async salvar(nome, url): Promise<any> {
    let retorno = false;

    this.url_api = '/v1/tournaments.json'+
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

  /**
   * Responsável por adicionar um participante a api do challonge
   * @param id 
   * @param nome 
   */
  async addParticipante(id, nome, key): Promise<any> {
    let retorno = false;

    this.url_api = '/v1/tournaments/' + id + '/participants.json'+
                                '?api_key=HFQp64rnt3zSP216dLZ1A3KmIXjkyCHf66W4bwAu'+
                                '&participant[name]='+nome;
    await this.http.post(this.url_api, {}).toPromise().then(
      r => {
        //console.log(r);
        this.salvarFirebaseParticipante(r, key);
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

  /**
   * Responsável por preparar e salvar os dados de retorno
   * do torneio salvo na api do challonge
   * @param v 
   */
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

  /**
   * Responsável por salvar os dados de retorno do participante
   * adicionado via api do challonge
   * @param v 
   */
  private async salvarFirebaseParticipante(v: any, key): Promise<any>{
    let ret = false;

    let dados = {
      id: v.participant.id,
      nome:  v.participant.name,
      adicionado_em: v.participant.created_at,
      ativo:  v.participant.active
    };

    await this.db.list("usuarios/" + localStorage.token + "/torneios/" + key + "/participantes").push(dados).then(
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
