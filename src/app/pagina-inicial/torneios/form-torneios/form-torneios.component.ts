import { Component, OnInit, Input } from '@angular/core';
import { LoginService } from '../../../login.service';
import { Router } from '@angular/router';
import { NgForm, NgModel, NgControl } from '@angular/forms';
import { IgxInputGroupComponent } from 'igniteui-angular/main';
import { TorneiosService } from '../../../torneios.service';

@Component({
  selector: 'app-form-torneios',
  templateUrl: './form-torneios.component.html',
  styleUrls: ['./form-torneios.component.css']
})
export class FormTorneiosComponent implements OnInit {
  
  public id;
  public nome;
  public url;
  public key;

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
    let r = false;

    r = await this.torneio.salvar(this.nome, this.url);

    console.log(r);
  }

  ngOnInit() {
  }

}
