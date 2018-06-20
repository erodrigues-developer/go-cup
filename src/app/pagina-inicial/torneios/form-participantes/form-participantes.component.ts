import { Component, OnInit, ViewChild } from '@angular/core';
import { LoginService } from '../../../login.service';
import { Router, ActivatedRoute } from '@angular/router';
import { TorneiosService } from '../../../torneios.service';
import { IgxInputGroupComponent, IgxDialogComponent } from 'igniteui-angular/main';

@Component({
  selector: 'app-form-participantes',
  templateUrl: './form-participantes.component.html',
  styleUrls: ['./form-participantes.component.css']
})
export class FormParticipantesComponent implements OnInit {

  public id;
  public key;
  public nome;
  public participante;

  public title;
  public msg;

  @ViewChild(IgxInputGroupComponent)
  public u: IgxInputGroupComponent;

  @ViewChild(IgxDialogComponent)
  public dialog: IgxDialogComponent;

  constructor(private svc: LoginService, private rota: Router, 
              private torneio: TorneiosService, private route: ActivatedRoute) {}
              
  ngOnInit() {
    this.auth();
    this.setId();
    this.setKey();
    this.get(this.id);
  }
  

  /**
   * Verifica se o usuário está devidamente autenticado
   */
  private async auth() {
    let logado;

    logado = await this.svc.verificaToken();

    if (!logado) {
      this.rota.navigate(['/login'])
    }
  }

  /**
   * Recebe a key da url e seta na propriedade da classe
   * @author Erodrigues
   * @since 19/06/2018
   */
  setId() {
    this.id = this.route.snapshot.paramMap.get('id');
  }

  /**
   * Recebe o id da url e seta na propriedade da classe
   * @author Erodrigues
   * @since 19/06/2018
   */
  setKey() {
    this.key = this.route.snapshot.paramMap.get('key');
  }

  /**
   * Instancia a classe de serviço torneios e requisita os dados do torneio pelo id
   * em seguida atribui o nome retornado na proprieadade nome
   * @param id 
   */
  private async get(id){
    let r = false;
    let v;

    v = await this.torneio.getTorneioId(this.id);

    this.u.element.nativeElement.classList = "igx-input-group igx-input-group--required igx-input-group--filled";
    this.nome = v.tournament.name;   

  }

  /**
   * Responsável por receber a submissão do formulário,
   * instanciar o service de torneios que irá persistir
   * os dados na api e no firebase
   */
  private async salvar() {
    if ( this.nome == "" || this.nome == null ||
        this.participante == "" || this.participante == null ){
      
      this.title = "Falha";
      this.msg = "Insira os dados do participante";
      this.dialog.open();
      return false;
    }

    let r = false;

    r = await this.torneio.addParticipante(this.id, this.participante, this.key);

    if (r) {
      this.title = "Sucesso";
      this.msg = "Participante adicionado com sucesso";
      this.dialog.open();
    }
    else {
      this.title = "Falha";
      this.msg = "Falha ao adicionar participante ao torneio";
      this.dialog.open();
    }
  }

}
