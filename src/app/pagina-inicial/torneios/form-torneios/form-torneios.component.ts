import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { LoginService } from '../../../login.service';
import { Router } from '@angular/router';
import { NgForm, NgModel, NgControl } from '@angular/forms';
import { IgxInputGroupComponent, IgxDialogComponent } from 'igniteui-angular/main';
import { TorneiosService } from '../../../torneios.service';

@Component({
  selector: 'app-form-torneios',
  templateUrl: './form-torneios.component.html',
  styleUrls: ['./form-torneios.component.css']
})
export class FormTorneiosComponent implements OnInit {

  @ViewChild(IgxDialogComponent)
  public dialog: IgxDialogComponent;
  
  public id;
  public nome;
  public url;
  public key;

  public title;
  public msg;
  
  constructor(private svc: LoginService, private rota: Router, private torneio: TorneiosService) { 
    this.auth();
  }

  private async auth() {
    let logado;

    logado = await this.svc.verificaToken();

    if (!logado) {
      this.rota.navigate(['/login'])
    }
  }

  criarUrl(v: string, u:IgxInputGroupComponent) {
    // Remove os espaços
    v = v.split(" ").join("");

    // Transforma em minúsculas
    v = v.toLowerCase();

    // Atribui a propriedade url
    this.url = v;
    u.element.nativeElement.classList = "igx-input-group igx-input-group--required igx-input-group--filled";
  }

  private async salvar(){

    if ( this.nome == "" || this.nome == null ||
        this.url == "" || this.url == null ){
      
      this.title = "Falha";
      this.msg = "Insira os dados para criar o torneio";
      this.dialog.open();
      return false;
    }

    let r = false;

    r = await this.torneio.salvar(this.nome, this.url);

    if (r) {
      this.title = "Sucesso";
      this.msg = "Torneio criado com sucesso";
      this.dialog.open();
    }
    else {
      this.title = "Falha";
      this.msg = "Falha ao criar o torneio";
      this.dialog.open();
    }
  }

  ngOnInit() {
  }

}
