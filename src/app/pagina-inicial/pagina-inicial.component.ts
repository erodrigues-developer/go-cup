import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-pagina-inicial',
  templateUrl: './pagina-inicial.component.html',
  styleUrls: ['./pagina-inicial.component.css']
})
export class PaginaInicialComponent implements OnInit {

  torneios = [
    {id: 1, name: 'Torneio 1'},
    {id: 2, name: 'Torneio 2'},
    {id: 3, name: 'Torneio 3'},
    {id: 4, name: 'Torneio 4'},
    {id: 5, name: 'Torneio 5'},
    {id: 6, name: 'Torneio 6'},
    {id: 7, name: 'Torneio 7'},
    {id: 8, name: 'Torneio 8'},
    {id: 9, name: 'Torneio 9'},
  ];

  constructor(private svc: LoginService, private rota: Router) {
    this.auth();
  }

  private async auth(){
    let logado;
    logado = await this.svc.verificaToken();

    if (!logado) {
      this.rota.navigate(['login'])
    }
  }

  ngOnInit() {
  }

}
