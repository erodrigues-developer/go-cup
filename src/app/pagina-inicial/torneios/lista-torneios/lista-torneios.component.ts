import { Component, OnInit } from '@angular/core';
import { TorneiosService } from '../../../torneios.service';
import { LoginService } from '../../../login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-torneios',
  templateUrl: './lista-torneios.component.html',
  styleUrls: ['./lista-torneios.component.css']
})
export class ListaTorneiosComponent implements OnInit {

  torneios = [];

  constructor(private svc: LoginService, private rota: Router, private torneio: TorneiosService) { 
    this.auth();
  }

  private async auth(){
    let logado;

    logado = await this.svc.verificaToken();

    if (!logado) {
      this.rota.navigate(['/login'])
    }
  }

  ngOnInit() {
    this.get();
  }

  private async get(){
    let v;
    
    v = await this.torneio.getTorneios();

    this.torneios = v;
  }

}